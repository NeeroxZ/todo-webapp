import {Button, Divider, Grid, TextField, CircularProgress} from "@mui/material";
import {useGlobalStore} from "../../stores/GlobalStore";
import {useUserStore} from "../../stores/UserStore";
import {useState} from "react";
import {useChangeUser} from "../../hooks/useChangeUser";

export const ChangeMail = (props) => {
    const {mobileView} = useGlobalStore();

    const {user} = useUserStore();

    const {changeMail, isLoadingChangeMail, errorChangeMail} = useChangeUser();

    const [newMail, setNewMail] = useState("");
    const [mailError, setMailError] = useState(false);

    const handleMailChange = async () => {
        if (checkMail()) {
            await changeMail(newMail);
            if (!errorChangeMail) {
                // user feedback
                props.showStatusMessage("success", "Successfully changed mail address.")

                // set default states
                setNewMail("");
                setMailError(false);
            } else {
                // user feedback
                props.showStatusMessage("error", "Error changing mail address.")
            }
        }
    }

    const checkMail = () => {
        if (newMail === "") {
            setMailError(true);
            props.showStatusMessage("error", "You need to provide a new mail address.");
            return false;
        }
        setMailError(false);
        return true;
    }

    return (
        <>
            <Grid container rowSpacing={1}>
                <Grid item xs={12} style={{
                    display: "flex",
                    justifyContent: "flex-start",
                }}>
                    <div className="infoText rowHeading">
                        Change email
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                {isLoadingChangeMail
                    ? <CircularProgress/>
                    : (
                        <Grid container item xs={12}
                              rowSpacing={2}
                              className="infoContainer"
                        >
                            {!mobileView &&
                                <Grid item xs={12} style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                }}>
                                    <div className="infoText">
                                        Current email:
                                    </div>
                                    <div className="infoText userValue">
                                        {user.email}
                                    </div>
                                </Grid>
                            }
                            <Grid container item xs={12} spacing={1.5}>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        size="small"
                                        label="New mail"
                                        className="inp"
                                        onChange={(e) => setNewMail(e.target.value)}
                                        error={mailError}
                                    />
                                </Grid>
                                <Grid container item xs={12} sm={4} justifyContent={mobileView ? "" : "flex-end"}>
                                    <Button
                                        variant="outlined"
                                        className={`btnInf ${mobileView ? "mobile row" : ""}`}
                                        onClick={handleMailChange}
                                    >
                                        Change
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>

        </>
    );
};