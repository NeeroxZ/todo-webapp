import {TextField, useMediaQuery} from "@mui/material";
import React from "react";
import {MobileDateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import dayjs from "dayjs";
import PropTypes from 'prop-types';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import 'dayjs/locale/de';

export const DatePicker = (props) => {
    const matches = useMediaQuery('(min-width:600px)');
    const handleChange = (newValue) => {
        props.setDate(newValue);
    };

    return (
        <>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="de"
            >
                {matches
                    ?
                    <DateTimePicker
                        className="tdDatePicker"
                        label="Due date"
                        ampm={false}
                        value={props.date}
                        onChange={handleChange}
                        error
                        renderInput={(params) => <TextField {...params} error={props.dateError}/>}
                    />
                    :
                    <MobileDateTimePicker className="tdDatePicker"
                                          label="Due date"
                                          ampm={false}
                                          value={props.date}
                                          onChange={handleChange}
                                          renderInput={(params) => <TextField {...params} error={props.dateError}/>}
                    />
                }
            </LocalizationProvider>
        </>
    );
};

// DatePicker.PropTypes =  {
//     date: PropTypes.instanceOf(Date),
//     setDate: PropTypes.any,
// }