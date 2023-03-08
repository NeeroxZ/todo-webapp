import "../styles/userInfo.css";
import {Alert, AlertTitle, Backdrop, CircularProgress, Grid, TextField} from "@mui/material";
import {useState} from "react";
import {useAuth} from "../stores/AuthStore";
import {Navigate, useNavigate} from "react-router-dom";
import {ChangeUsername} from "../components/settings/ChangeUsername";
import {ChangeMail} from "../components/settings/ChangeMail";
import {ChangePassword} from "../components/settings/ChangePassword";
import {UserInfo} from "../components/settings/UserInfo";
import {useGlobalStore} from "../stores/GlobalStore";
import {useUserStore} from "../stores/UserStore";
import {StatusBox} from "../components/StatusBox";

export const UserPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [statusData, setStatusData] = useState({type: "", message: ""});
    const [openStatus, setOpenStatus] = useState(false);

    const {mobileView} = useGlobalStore();
    const user = useUserStore();

    const showStatusMessage = (statusType, statusMessage) => {
        setStatusData({
            type: statusType,
            message: statusMessage,
        })
        setOpenStatus(true);
    }

    if (user.loading) {
        return (
            <>
                <Backdrop open={user.loading}>
                    <CircularProgress />
                </Backdrop>
            </>
        );
    }

    return (
        <>
            <div className="containerSpacer" />
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
                        </Grid>
                    </div>
                    {/*<form className="box">*/}
                    {/*    <p className="form-name">Change User Information</p>*/}
                    {/*    <div className="userRow">*/}
                    {/*            <h1>UserName</h1>*/}
                    {/*            <input className="userInput" type="text" placeholder="Username"*/}
                    {/*                   onChange={e => setUsername(e.target.value)}*/}
                    {/*            />*/}
                    {/*    </div>*/}
                    {/*    <div className="userRow">*/}
                    {/*            <h1>E-Mail</h1>*/}
                    {/*            <input className="userInput" type="email" placeholder="E-Mail"*/}
                    {/*                   onChange={e => setUsername(e.target.value)}*/}
                    {/*            />*/}
                    {/*    </div>*/}
                    {/*    <div className="userRow">*/}
                    {/*        <h1>Password</h1>*/}
                    {/*        <input className="userInput" type="password" placeholder="Password"*/}
                    {/*               onChange={e => setUsername(e.target.value)}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="userRow">*/}
                    {/*        <h1>Bockmark instead of DUE</h1>*/}
                    {/*        <input type="checkbox"/>*/}
                    {/*    </div>*/}
                    {/*    <div className="userRow">*/}
                    {/*        <h1>Disable Done Todo`s</h1>*/}
                    {/*        <input type="checkbox" className="checkBoxInput"/>*/}
                    {/*        <span className="checkmark"></span>*/}
                    {/*    </div>*/}
                    {/*    <input className="btn-submit" type="submit" name="" value="Save"></input>*/}
                    {/*    <input className="btn-delete" type="submit" name="" value="Delete"></input>*/}

                    {/*</form>*/}
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
