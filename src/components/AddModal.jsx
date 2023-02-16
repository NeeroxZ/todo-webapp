import React, {useState} from "react";
import {Box, TextField, Typography, Modal, Grid, InputLabel, Select, MenuItem} from "@mui/material";
import "../styles/userInfo.css";
import '../styles/modal.css'

import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


export const AddModal = (props) => {
    const handleClose = () => (props.setIsOpen(false));

    const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const inputProps = {
        step: 300,
        color: "white",
    };
    const [topics, setAge] = React.useState('');

    return (

        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>


                <div className="modalContainer">
                    <Modal
                        open={props.isOpen}
                        onClose={handleClose}
                        className="modal"
                    >
                        <Box className="modalBox">
                            <div className="containerUser">
                                <div className="rowLogin">
                                    <form className="box">
                                        <p className="form-name">Change User Information</p>
                                        <div className="userRow">
                                            <h1>UserName</h1>
                                            <input className="userInput" type="text" placeholder="Username"
                                            />
                                        </div>
                                        <div className="userRow">
                                            <h1>E-Mail</h1>
                                            <input className="userInput" type="email" placeholder="E-Mail"
                                            />
                                        </div>
                                        <div className="userRow">
                                            <h1>Password</h1>
                                            <input className="userInput" type="password" placeholder="Password"
                                            />
                                        </div>
                                        <div className="userRow">
                                            <h1>Date</h1>
                                            <DateTimePicker
                                                label="Date&Time picker"
                                                value={value}
                                                onChange={handleChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />                                            <span className="checkmark"></span>
                                        </div>
                                        <input className="btn-submit" type="submit" name="" value="Save"></input>
                                        <input className="btn-delete" type="submit" name="" value="Delete"></input>

                                    </form>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>
            </LocalizationProvider>
        </>
    );
};


