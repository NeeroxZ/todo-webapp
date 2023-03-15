import {Backdrop, Button, CircularProgress, Divider, Grid, TextField} from "@mui/material";
import {useState} from "react";
import {useUserStore} from "../../stores/UserStore";
import {useGlobalStore} from "../../stores/GlobalStore";
import '../../styles/userInfo.css';
import {useChangeUser} from "../../hooks/useChangeUser";
import {InfoModal} from "../modals/InfoModal";

export const ChangeUsername = () => {
    const [username, setUsername] = useState("");
    const {user, isLoadingUser} = useUserStore();
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [inputError, setInputError] = useState(false);
    const {changeUsername, isLoadingChangeUsername, errorChangeUsername} = useChangeUser();
    const {mobileView} = useGlobalStore();

    const handleChange = async () => {
        setInputError(false)
        if (username === user.username) {
            setInputError(true);
            return;
        }

        await changeUsername(username);
        if (!errorChangeUsername) {
            setShowInfoModal(true);
        }
    };

    return (
        <>
            <Grid container rowSpacing={1}>
                <Grid item xs={12} style={{
                    display: "flex",
                    justifyContent: "flex-start",
                }}>
                    <div className="infoText rowHeading">
                        Change username
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid container item xs={12}
                      rowSpacing={1}
                      className="infoContainer"
                >
                    {!mobileView &&
                        <Grid item xs={12} style={{
                            display: "flex",
                            justifyContent: "flex-start",
                        }}>
                            <div className="infoText">
                                Current username:
                            </div>
                            <div className="infoText userValue">
                                {isLoadingUser
                                    ? "..."
                                    : user.username
                                }
                            </div>
                        </Grid>
                    }
                    <Grid container item xs={12} rowSpacing={1.25} alignItems="center">
                        <Grid item xs={12} sm={8}>
                            <TextField
                                size="small"
                                label="New username"
                                className="inp"
                                onChange={(e) => setUsername(e.target.value)}
                                error={inputError}
                            />
                        </Grid>
                        <Grid container item xs={12} sm={4} justifyContent={mobileView ? "" : "flex-end"}>
                            <Button
                                variant="outlined"
                                className={`btnInf ${mobileView ? "mobile row" : ""}`}
                                onClick={handleChange}
                            >
                                Change
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Backdrop open={isLoadingChangeUsername}>
                <CircularProgress />
            </Backdrop>
            <InfoModal heading={"Changed Username"}
                       infoText={`New username: ${username}`}
                       show={showInfoModal}
                       setShow={setShowInfoModal}
                       redirecting={true}
            />
        </>
    );
}