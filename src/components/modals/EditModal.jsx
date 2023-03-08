import PropTypes from 'prop-types';
import {Bookmark, BookmarkBorder, Edit} from "@mui/icons-material";
import {useTopics} from "../../stores/TopicStore";
import React, {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import {useAuth} from "../../stores/AuthStore";
import {
    Autocomplete,
    Backdrop,
    Box, Button,
    Checkbox,
    CircularProgress,
    Grid,
    Modal,
    TextField,
    useMediaQuery
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {DatePicker} from "./DatePicker";
import {useUserStore} from "../../stores/UserStore";
import {useGlobalStore} from "../../stores/GlobalStore";
import pb from "../../utils/pocketbase";
import {TopicModal} from "./TopicModal";
import {findShadowRoot} from "bootstrap/js/src/util";
export const EditModal = (props) => {
    const user = useUserStore();
    const tpCtx = useTopics();

    const [loadingData, setLoadingData] = useState(true);

    const {mobileView} = useGlobalStore();

    const [showAddTopic, setShowAddTopic] = useState(false);


    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [topic, setTopic] = useState(null);
    const [topicInput, setTopicInput] = useState("");
    const [topicError, setTopicError] = useState(false);
    const [desc, setDesc] = useState("");
    const [descError, setDescError] = useState(false);
    const [date, setDate] = useState(null);
    const [dateError, setDateError] = useState(false);

    const [deleted, setDeleted] = useState(false);

    const [disableBtn, setDisableBtn] = useState(true);
    const firstUpdate = useRef(true);

    const {getUserId} = useAuth();

    const loadTopic = () => {
        if (!tpCtx.loading && (tpCtx.topics.length !== 0)) {
            tpCtx.topics.forEach((elem, i) => {
                if (elem.id === props.todoData.topic) {
                    setTopic(elem);
                }
            });
        }
    }

    // reset states on hide
    useEffect(() => {
        if (!props.show) {
            setLoadingData(true);
            setTitle("");
            setTitleError(false);
            setBookmark(false);
            setTopic( null);
            setTopicInput("");
            setTopicError(false);
            setDesc("");
            setDescError(false);
            setDate(null);
            setDateError(false);
            setDisableBtn(true);
            firstUpdate.current = true;
        } else {
            setLoadingData(true);
            loadTopic()
            setTitle(props.todoData.title);
            setBookmark(props.todoData.saved);
            setDesc(props.todoData.description);
            setDate(dayjs(props.todoData.date));
            setDeleted(props.todoData.deleted);
            setDisableBtn(true);
            setLoadingData(false);
            firstUpdate.current = true;
        }
    }, [props.show]);

    useEffect(() => {
        if (props.show && !loadingData) {
            if (firstUpdate.current) {
                firstUpdate.current = false;
            } else {
                setDisableBtn(false);
            }
        }
    }, [title, desc, bookmark, topic, date]);

    // Todo (Marvin): Error handling again
    const updateTodo = async () => {
        if (checkInputs()) {
            const data = {
                "user_id": getUserId(),
                "title": title,
                "saved": bookmark,
                "description": desc,
                "deleted": deleted,
                "repetitive": "none",
                "due_date": `${date.format("YYYY-MM-DD HH:mm:ss")}.000Z`,
            };
            if (topic !== null) {
                data["topic"] = topic.id;
            }

            await pb.collection('todo').update(props.todoData.id, data);
            await props.reloadTodos()
            props.setShow(false);
        }
    };

    const handleDelete = async () => {
        const data = {
            "deleted": true,
        }
        await pb.collection('todo').update(props.todoData.id, data);
        await props.reloadTodos();
        props.setShow(false);
    };

    const checkInputs = () => {
        let failed = false;
        if (title === "") {
            setTitleError(true);
            failed = true;
        } else {
            setTitleError(false);
        }
        if (date === null) {
            setDateError(true);
            failed = true;
        } else {
            setDateError(false);
        }
        return !failed;
    };

    const handleBookmarkChange = (event) => {
        setBookmark(event.target.checked)
    };

    const handleExit = () => {
        props.setShow(false);
    };


    return (
        <>
            <Modal
                open={props.show}
                onClose={() => {
                    handleExit()
                }}
                className="modal"
            >
                <Box className={`modalBox ${mobileView ? "mobile" : ""}`}>
                    <div className="contentWrapper">
                        {/*{props.reloadOnAdd &&*/}
                            <Backdrop open={props.reloading}>
                                <CircularProgress/>
                            </Backdrop>
                        {/*}*/}
                        <div className={`modalHeading ${!mobileView ? "" : "mobile"}`}>
                            {(title !== "")
                                ? <div className="modalHeadingDynamic">Edit '{title}'</div>
                                : <div>Edit Todo</div>
                            }
                            {mobileView &&
                                <div className="tpIconRight.header">
                                    <Tooltip title="Bookmark" placement="top" arrow>
                                        <Checkbox
                                            color="primary"
                                            icon={<BookmarkBorder size="large" color="inherit"/>}
                                            checked={bookmark}
                                            checkedIcon={<Bookmark size="large" color="inherit"/>}
                                            onChange={handleBookmarkChange}
                                        />
                                    </Tooltip>
                                </div>
                            }
                        </div>
                        <div className="gridSpacer"/>

                        <Grid container spacing={3.25}>
                            <Grid container item xs={12}>
                                <Grid item xs={12} sm={10}>
                                    <TextField
                                        label="Title"
                                        error={titleError}
                                        value={title}
                                        onChange={(event) => {
                                            setTitle(event.target.value);
                                        }}
                                        className="tdTitleStyle"
                                        autoFocus={true}
                                        id="tdTitle"/>
                                </Grid>
                                {!mobileView &&
                                    <Grid item xs={2}>
                                        <div className="tpIconRight regular">
                                            <Tooltip title="Bookmark" placement="right" arrow>
                                                <Checkbox
                                                    color="primary"
                                                    icon={<BookmarkBorder size="large" color="inherit"/>}
                                                    checked={bookmark}
                                                    checkedIcon={<Bookmark size="large" color="inherit"/>}
                                                    onChange={handleBookmarkChange}
                                                />
                                            </Tooltip>
                                        </div>
                                    </Grid>
                                }
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={12} sm={10}>
                                    <Autocomplete
                                        disablePortal
                                        error={topicError.toString()}
                                        id="tdTopic"
                                        className="tdTopicStyle"
                                        value={topic}
                                        onChange={(event, newValue) => {
                                            setTopic(newValue);
                                        }}
                                        inputValue={topicInput}
                                        onInputChange={(event, newInputValue) => {
                                            setTopicInput(newInputValue);
                                        }}
                                        options={tpCtx.topics}
                                        getOptionLabel={(option) => option.titleMod}
                                        loading={tpCtx.waiting}
                                        renderInput={(params) => <TextField {...params} label="Topic"
                                                                            error={topicError}/>}
                                    />
                                </Grid>
                                {!mobileView
                                    ?
                                    <Grid item xs={2}>
                                        <div className="tpIconRight regular">
                                            <Tooltip title="Create topic" placement="right" arrow>
                                                <IconButton size="large" color="textWhite" onClick={() => {
                                                    setShowAddTopic(true);
                                                }}>
                                                    <AddCircleOutlineIcon size="large"/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </Grid>
                                    :
                                    <Grid item xs={12}>
                                        <div className="btnAddContainer">
                                            <Button variant="outlined" className="btnAddTopic" onClick={() => {
                                                setShowAddTopic(true);
                                            }}>
                                                Create Topic
                                            </Button>
                                        </div>
                                    </Grid>
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    error={descError}
                                    value={desc}
                                    onChange={(event) => {
                                        setDesc(event.target.value);
                                    }}
                                    label="Descripton"
                                    multiline
                                    rows={3}
                                    sx={{width: "100%"}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DatePicker
                                    date={date}
                                    setDate={setDate}
                                    dateError={dateError}
                                />
                            </Grid>
                        </Grid>
                    </div>
                    <div className="bottomBtnGroup">
                        <div className="bottomBtnGroupContainer leftGroup">
                            <Button variant="contained" color="error"
                                    // startIcon={<DeleteIcon />}
                                    className={`btn delete ${!mobileView?"desktopBtn":""}`}
                                    onClick={handleDelete}
                            ><DeleteIcon /></Button>
                            <div className="bottomBtnGroupR">
                                <Button variant="outlined" color="error"
                                        className={`btn ${!mobileView?"desktopBtn":""}`}
                                        onClick={handleExit}>Exit</Button>
                                <Button variant="contained"
                                        className={`btn save ${!mobileView?"desktopBtn":""}`}
                                        disabled={disableBtn}
                                        onClick={() => {
                                    updateTodo();
                                }}>Save</Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
            <TopicModal show={showAddTopic} setShow={setShowAddTopic}/>
        </>
    );
};

Edit.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    todoId: PropTypes.number.isRequired,
    todoData: PropTypes.object.isRequired,
    reloading: PropTypes.func.isRequired,
    reloadTodos: PropTypes.func.isRequired,
}
