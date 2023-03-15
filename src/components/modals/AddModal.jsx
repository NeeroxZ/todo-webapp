import React, {useEffect, useState} from "react";
import {
    Box,
    TextField,
    Modal,
    Autocomplete,
    Checkbox,
    Grid,
    Button,
    Backdrop,
    CircularProgress
} from "@mui/material";
import "../../styles/userInfo.css";
import '../../styles/modal.css'
import dayjs from 'dayjs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from '@mui/material/IconButton';
import {DatePicker} from "./DatePicker";
import {Bookmark, BookmarkBorder} from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import {useAuth} from "../../stores/AuthStore";
import pb from "../../utils/pocketbase";
import {useTopics} from "../../stores/TopicStore";
import {useGlobalStore} from "../../stores/GlobalStore";
import {TopicModal} from "./TopicModal";
import PropTypes from 'prop-types';


export const AddModal = (props) => {
    const tpCtx = useTopics();

    const {mobileView} = useGlobalStore();

    const [showAddTopic, setShowAddTopic] = useState(false);

    const [initialRender, setInitialRender] = useState(true);

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);

    const [bookmark, setBookmark] = useState(false);

    const [topic, setTopic] = useState(props.selectedTopic);
    const [topicInput, setTopicInput] = useState("");
    const [topicError, setTopicError] = useState(false);

    const [desc, setDesc] = useState("");

    const [date, setDate] = useState(dayjs(new Date()));
    const [dateError, setDateError] = useState(false);

    const {getUserId} = useAuth();

    useEffect(() => {
        setInitialRender(false);
    }, []);

    useEffect(() => {
        if (props.selectedTopic !== null && !initialRender) {
            setTopic(props.selectedTopic);
        }
    }, [props.selectedTopic])

    useEffect(() => {
        if (!props.show && !initialRender) {
            setTitle("");
            setTitleError(false);
            setBookmark(false);
            setTopic(null);
            setTopicInput("");
            setTopicError(false);
            setDesc("");
            setDate(dayjs(new Date()));
            setDateError(false);
        }
    }, [props.show]);


    useEffect(() => {
        if (props.reloadingExternal !== undefined && !initialRender) {
            if (!props.reloadingExternal) {
                props.setShow(false);
            }
        }
    }, [props.reloadingExternal])

    // Todo (Marvin): Error handling again
    const uploadTodo = async () => {
        if (checkInputs()) {
            const data = {
                "user_id": getUserId(),
                "title": title,
                "saved": bookmark,
                "description": desc,
                "repetitive": "none",
                "due_date": `${date.format("YYYY-MM-DD HH:mm:ss")}.000Z`
            };
            if (topic !== null) {
                data["topic"] = topic.id;
            }

            await pb.collection('todo').create(data);
            if (props.reloadOnAdd && props.triggerExternal === undefined) {
                await props.reloadTodos();
            } else if (props.reloadOnAdd && props.triggerExternal !== undefined) {
                props.setTriggerExternal(true);
            }
        }
    };

    const handleUpload = async () => {
        await uploadTodo();
        if (props.triggerExternal === undefined) {
            props.setShow(false);
        }
    }

    const checkInputs = () => {
        let failed = false;
        if (title === "") {
            setTitleError(true);
            failed = true;
        } else {
            setTitleError(false);
        }
        if (date === dayjs('')) {
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
                        {props.reloadOnAdd &&
                            (props.triggerExternal
                                    ? (
                                        <Backdrop open={props.reloadingExternal}>
                                            <CircularProgress/>
                                        </Backdrop>
                                    )
                                    : (
                                        <Backdrop open={props.reloading}>
                                            <CircularProgress/>
                                        </Backdrop>
                                    )
                            )
                        }
                        <div className={`modalHeading ${!mobileView ? "" : "mobile"}`}>
                            <div>Add Todo</div>
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
                                            if (newInputValue !== "undefined") {
                                                setTopicInput(newInputValue);
                                            }
                                        }}
                                        options={tpCtx.topics}
                                        getOptionLabel={(option) => option.titleMod || ""}
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
                        <div className="bottomBtnGroupContainer">
                            <div className="bottomBtnGroupR">
                                <Button variant="outlined" color="error"
                                        className={`btn ${!mobileView ? "desktopBtn" : ""}`}
                                        onClick={handleExit}>Exit</Button>
                                <Button variant="contained" className={`btn save ${!mobileView ? "desktopBtn" : ""}`}
                                        onClick={handleUpload}
                                >Save</Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
            <TopicModal show={showAddTopic} setShow={setShowAddTopic}/>
        </>
    );
};

AddModal.defaultProps = {
    selectedTopic: "",
    reloading: false,
}

AddModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,

    triggerExternal: PropTypes.bool,
    setTriggerExternal: PropTypes.func,

    reloadingExternal: PropTypes.bool
}

