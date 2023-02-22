import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Alert, Snackbar} from "@mui/material";
import PropTypes from 'prop-types';


export const StatusBox = (props) => {

    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                open={props.show}
                color={"failed"}
                autoHideDuration={6000}
                onClose={() => props.setShow(false)}
                // message={props.message}
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
                <Alert onClose={() => props.setShow(false)} severity="success" sx={{ width: '100%' }}>
                    This is a success message!
                </Alert>
            </Snackbar>
        </>
    );
};

StatusBox.defaulProps = {
    closeButton: false
};

StatusBox.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,

    closeButton: PropTypes.bool,
}

