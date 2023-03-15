import {Box, CircularProgress, Modal} from "@mui/material";
import PropTypes from 'prop-types';
import '../../styles/modal.css';
import {useGlobalStore} from "../../stores/GlobalStore";
import {useEffect} from "react";
import {useAuth} from "../../stores/AuthStore";

export const InfoModal = (props) => {

    let sleepTime = 3000;

    const {mobileView} = useGlobalStore();
    const {logout} = useAuth();

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    const redirectTimeout = async () => {
        sleep(sleepTime).then(logout);
    }

    useEffect(() => {
        if (props.show && props.redirecting) {
            redirectTimeout();
        }
    }, [props.show])
    const handleExit = () => {
        props.setShow(false);
    }

    return (
        <>
            <Modal
                open={props.show}
                onClose={() => {
                    if (!props.redirecting) {
                        handleExit();
                    }
                }}
                className={"modal"}
            >
                <Box className={`modalBox info ${mobileView ? "mobile" : ""} `}>
                    <div className={"contentWrapper"}>
                        <div className={"infoMHeading"}>
                            {props.heading}
                        </div>
                        <div className={"infoMItem infoText"}>
                            {props.infoText}
                        </div>
                        {props.redirecting && (
                            <>
                                <div className={"infoMItem redirect"}>
                                    Redirecting to login...
                                </div>
                                <div className={"infoMItem"}>
                                    <CircularProgress />
                                </div>
                            </>
                            )
                        }
                    </div>
                </Box>

            </Modal>
        </>
    );
}

InfoModal.defaultProps = {
    canExit: true,
    redirecting: false,
}

InfoModal.propTypes = {
    // text info
    heading: PropTypes.string.isRequired,
    infoText: PropTypes.string.isRequired,

    // other props
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired,
    canExit: PropTypes.bool,
    redirecting: PropTypes.bool,
}

