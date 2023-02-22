import React, {useEffect, useState} from "react";
import {
    Box,
    TextField,
    Modal,
    Autocomplete,
    useMediaQuery,
    Checkbox,
    Grid,
    Button,
    Backdrop,
    CircularProgress
} from "@mui/material";
import "../styles/userInfo.css";
import '../styles/modal.css'
import dayjs from 'dayjs';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import IconButton from '@mui/material/IconButton';
import {DatePicker} from "./DatePicker";
import {Bookmark, BookmarkBorder} from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import {useAuth} from "../stores/AuthStore";
import pb from "../utils/pocketbase";
import {useTopics} from "../stores/TopicStore";

export const AddModal = (props) => {
    const tpCtx = useTopics();

    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);

    const [bookmark, setBookmark] = useState(false);

    const [topic, setTopic] = useState(null);
    const [topicInput, setTopicInput] = useState("");
    const [topicError, setTopicError] = useState(false);

    const [desc, setDesc] = useState("");
    const [descError, setDescError] = useState(false);

    const [date, setDate] = useState(dayjs());
    const [dateError, setDateError] = useState(false);

    const {getUserId} = useAuth();


    useEffect(() => {
        if (props.topic !== null) {
            setTopic(props.selectedTopic);
        }
    }, []);

    // Todo (Marvin): Error handling
    const uploadTodo = async () => {
        if (checkInputs()) {
            const data = {
                "user_id": getUserId(),
                "title": title,
                "saved": bookmark,
                "description": desc,
                "done": false,
                "deleted": false,
                "repetitive": "none",
                "due_date": `${date.format("YYYY-MM-DD hh:mm:ss")}.000Z`
            };
            if (topic !== null) {
                data["topic"] = topic.id;
            }

            await pb.collection('todo').create(data);

            if (props.reloadOnAdd) {
                await props.reloadFunction()
            }
            props.setShow(false);

        }
    };


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



    const matches = useMediaQuery('(min-width:600px)');

    const handleBookmarkChange = (event) => {
        setBookmark(event.target.checked)
    };

    const handleExit = () => {
        props.setShow(false);
    };


    return (

        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Modal
                    open={props.show}
                    onClose={() => {
                        handleExit()
                    }}
                    className="modal"
                >
                    <Box className={`modalBox ${!matches ? "mobile" : ""}`}>
                        <div className="contentWrapper">
                            {props.reloadOnAdd &&
                                <Backdrop open={props.loading}>
                                    <CircularProgress />
                                </Backdrop>
                            }
                            <div className={`modalHeading ${matches ? "" : "mobile"}`}>
                                <div>Add Todo</div>
                                {!matches &&
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
                                    {matches &&
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
                                    {matches
                                        ?
                                        <Grid item xs={2}>
                                            <div className="tpIconRight regular">
                                                <Tooltip title="Create topic" placement="right" arrow>
                                                    <IconButton size="large" color="textWhite">
                                                        <AddCircleOutlineIcon size="large"/>
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </Grid>
                                        :
                                        <Grid item xs={12}>
                                            <div className="btnAddContainer">
                                                <Button variant="outlined" className="btnAddTopic">
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
                            <Button variant="outlined" color="error" className="btn"
                                    onClick={handleExit}>Exit</Button>
                            <Button variant="contained" className="btn save" onClick={() => {
                                uploadTodo();
                            }}>Save</Button>
                        </div>
                    </Box>
                </Modal>
            </LocalizationProvider>
        </>
    );
};

AddModal.defaultProps = {
    reloadOnAdd: false,
    selectedTopic: null,
}

