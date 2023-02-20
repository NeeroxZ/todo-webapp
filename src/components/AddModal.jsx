import React, {useEffect, useState} from "react";
import {Box, TextField, Modal, Autocomplete, useMediaQuery, Checkbox, Grid, Button} from "@mui/material";
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

export const AddModal = (props) => {

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

    const [variant, setVariant] = useState(props.variant);
    const [varEdit, setVarEdit] = useState(false);



    const {getUserId} = useAuth();


    useEffect(() => {
        if (props.variant === "add") {
            setVarEdit(true);
        }
    }, []);

    // Todo (Marvin): TOPICS
    // Todo (Marvin): Error handling
    const uploadTodo = () => {
        if (checkInputs()) {
            const data = {
                "user_id": getUserId(),
                "title": title,
                "saved": bookmark,
                "description": desc,
                "done": false,
                "deleted": false,
                "repetitive": "none",
                "topic": "hoc0qrqfpalx5rh",
                "due_date": `${date.format("YYYY-MM-DD hh:mm:ss")}.000Z`
            };

            pb.collection('todo').create(data)
                .then(props.setShow(false));
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
        if (topic === null) {
            setTopicError(true);
            failed = true;
        } else {
            setTopicError(false);
        }
        if (date === dayjs('')) {
            setDateError(true);
            failed = true;
        } else {
            setDateError(false);
        }
        if (desc === "") {
            setDescError(true);
            failed = true;
        } else {
            setDescError(false);
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


                <div className="modalContainer">
                    <Modal
                        open={props.show}
                        onClose={() => {
                            handleExit()
                        }}
                        className="modal"
                    >
                        <Box className={`modalBox ${!matches ? "mobile" : ""}`}>
                            <div className="contentWrapper">
                                <div className={`modalHeading ${matches ? "" : "mobile"}`}>
                                    {varEdit
                                        ? <div>Add Todo</div>
                                        : <div>Edit Todo</div>
                                    }
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
                                                options={top100Films}
                                                renderInput={(params) => <TextField {...params} label="Topic" error={topicError}/>}
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
                </div>
            </LocalizationProvider>
        </>
    );
};

AddModal.defaultProps = {
    variant: "add",
}


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }
];

