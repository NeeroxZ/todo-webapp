import PropTypes from 'prop-types';
import {Backdrop, CircularProgress, Modal, Box, Checkbox, TextField, Grid, Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useGlobalStore} from "../../stores/GlobalStore";
import {useTopics} from "../../stores/TopicStore";
import Tooltip from "@mui/material/Tooltip";
import {Bookmark, BookmarkBorder} from "@mui/icons-material";
import pb from "../../utils/pocketbase";

import '../../styles/modal.css'
import {useAuth} from "../../stores/AuthStore";
export const TopicModal = (props) => {
    const {mobileView} = useGlobalStore();
    const tp = useTopics();
    const auth = useAuth();

    const [title, setTitle] = useState("");
    const [inpErr, setInpErr] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateTopic = async () => {
        if (title === "") {
            setInpErr(true);
            return;
        }
        if (!tp.waiting) {
            console.log("Bin her")
            setLoading(true);
            let newTitle = title.replaceAll("_", " ").toLowerCase();
            let found = false;
            tp.topics.forEach((elem, i) => {
                if (elem.titleLow === newTitle) {
                    found = true;
                }
            });
            if (!found) {
                setInpErr(false);
                console.log("Bio")
                let data = {
                    "title": title,
                    "user_id": auth.getUserId(),
                }
                try {
                    await pb.collection('topics').create(data);
                    await tp.loadTopics();
                    props.setShow(false);
                } catch (e) {
                    console.log("error uploading topic: ", e);
                    setError(e);
                }


            } else {
                setInpErr(true);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!props.show) {
            setTitle("");
            setInpErr(false);
        }
    }, [props.show]);

    return (
        <>
            <Modal
                open={props.show}
                onClose={() => {
                    props.setShow(false);
                }}
                className="modal"
            >
                <Box className={`modalBox topic ${mobileView ? "mobile" : ""}`}>
                    <div className="contentWrapper">
                        <div className={`modalHeading`}>
                            <div>Add Topic</div>
                        </div>
                        <div className="gridSpacer"/>

                        <TextField
                            label="Title"
                            error={inpErr}
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value);
                            }}
                            className="tdTitleStyle"
                            id="tdTitle"/>
                    </div>
                    <div className="bottomBtnGroup">
                        <div className="bottomBtnGroupContainer">
                            <div className="bottomBtnGroupR">
                                <Button variant="outlined" color="error" className="btn"

                                        onClick={() => props.setShow(false)}>Exit</Button>
                                <Button variant="contained" className="btn save" onClick={() => {
                                    validateTopic();
                                }}>Save</Button>
                            </div>
                        </div>
                    </div>
                </Box>

            </Modal>


        </>
    );
};

TopicModal.propTypes = {
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
}