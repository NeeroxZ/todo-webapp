import "../styles/userInfo.css";
import {Grid} from "@mui/material";
import {useState} from "react";
import {ChangeUsername} from "../components/settings/ChangeUsername";
import {ChangeMail} from "../components/settings/ChangeMail";
import {ChangePassword} from "../components/settings/ChangePassword";
import {useGlobalStore} from "../stores/GlobalStore";
import {StatusBox} from "../components/StatusBox";
import {ChangeDashboardView} from "../components/settings/ChangeDashboardView";

export const SettingsPage = () => {
    const {setTabName} = useGlobalStore();
    setTabName("Settings");

    const [statusData, setStatusData] = useState({type: "", message: ""});
    const [openStatus, setOpenStatus] = useState(false);

    const {mobileView} = useGlobalStore();

    const showStatusMessage = (statusType, statusMessage) => {
        setStatusData({
            type: statusType,
            message: statusMessage,
        })
        setOpenStatus(true);
    }

    return (
        <>
            {!mobileView &&
                <div className="containerSpacer" />
            }

            <div className="containerUser">
                <div className="rowLogin">
                    <div className={`box ${mobileView ? "mobile" : ""}`}>
                        <Grid container rowSpacing={2.5}>
                            <Grid item xs={12}>
                                <div className="userHeading">Account</div>
                            </Grid>
                            <Grid item xs={12}>
                                <ChangeUsername
                                    showStatusMessage={showStatusMessage}
                                    className="userRow"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ChangeMail
                                    showStatusMessage={showStatusMessage}
                                    className="userRow"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ChangePassword
                                    showStatusMessage={showStatusMessage}
                                    className="userRow"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ChangeDashboardView
                                    showStatusMessage={showStatusMessage}
                                    className="userRow"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            <StatusBox
                type={statusData.type}
                message={statusData.message}
                show={openStatus}
                setShow={setOpenStatus}/>
        </>
    );
}
