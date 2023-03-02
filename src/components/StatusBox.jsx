import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Alert, Snackbar} from "@mui/material";
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";


export const StatusBox = (props) => {
    const [type, setType] = useState("success");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setType(props.type);
        setMsg(props.message);
    }, [props.type, props.message])

    const getAlert = () => {
        switch (props.type) {
            case "error":
                return (
                    <Alert onClose={() => props.setShow(false)} severity={"error"} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                );
            case "success":
                return (
                    <Alert onClose={() => props.setShow(false)} severity={"success"} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                )
            case "warning":
                return(
                    <Alert onClose={() => props.setShow(false)} severity={"warning"} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                )
            case "info":
                return (
                    <Alert onClose={() => props.setShow(false)} severity={"info"} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                )
        }
    }


    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                open={props.show}
                autoHideDuration={6000}
                onClose={() => props.setShow(false)}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5 }}
                        onClick={() => props.setShow(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                }
            >
                {getAlert()}
                {/*<Alert onClose={() => props.setShow(false)} severity={type} sx={{ width: '100%' }}>*/}
                {/*    {msg}*/}
                {/*</Alert>*/}
            </Snackbar>
        </>
    );
};

StatusBox.defaulProps = {
    closeButton: false,
    type: "success",
};

StatusBox.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,

    closeButton: PropTypes.bool,
}

