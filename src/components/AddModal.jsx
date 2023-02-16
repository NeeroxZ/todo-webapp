import React, {useState} from "react";
import {Box, TextField, Typography, Modal, Grid, InputLabel, Select, MenuItem} from "@mui/material";

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

                        </Box>
                    </Modal>
                </div>
            </LocalizationProvider>
        </>
    );
};


