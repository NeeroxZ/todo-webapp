import {Button, Divider, Grid, TextField} from "@mui/material";
import {useState} from "react";
import {useChangeUser} from "../../hooks/useChangeUser";
import {InfoModal} from "../modals/InfoModal";


export const ChangePassword = (props) => {
    const uc = useChangeUser();

    const [newPw, setNewPw] = useState("");
    const [newConfPw, setNewConfPw] = useState("");
    const [oldPw, setOldPw] = useState("");
    const [newPwError, setNewPwError] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const handlePwChange = async () => {
        if (checkPasswords()) {
            try {
                await uc.changePassword(oldPw, newPw, newConfPw).then(() => {
                        if (!uc.errorChangePassword) {
                            // set default states
                            setOldPw("");
                            setNewPw("");
                            setNewConfPw("");
                            setNewPwError(false);
                            setShowModal(true);
                        } else {
                            // user feedback
                            props.showStatusMessage("error", "Error changing account password.")
                        }
                });
            } catch (e) {
            }
        }
    };

    const checkPasswords = () => {
        if (oldPw === "") {
            setNewPwError(true);
            props.showStatusMessage("error", "You need to provide the current password.")
            return false;
        } else {
            setNewPwError(false);
        }
        if (newPw !== newConfPw) {
            setNewPwError(true);
            props.showStatusMessage("error", "New passwords do not match.")
            return false;
        } else if (newPw === "") {
            props.showStatusMessage("error", "No new password set.")
            return false;
        }
        setNewPwError(false);
        return true;
    };

    return (
        <>
            <Grid container rowSpacing={1}>
                <Grid item xs={12} style={{
                    display: "flex",
                    justifyContent: "flex-start",
                }}>
                    <div className="infoText rowHeading">
                        Change password
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid container item xs={12}
                      rowSpacing={1}
                      className="infoContainer"
                >
                    <Grid container item xs={12} spacing={1.5} alignItems="flex-start" marginBottom="20px">
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                type="password"
                                label="Current password"
                                value={oldPw}
                                error={newPwError}
                                onChange={(e) => setOldPw(e.target.value)}
                                className="inp"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                type="password"
                                label="New password"
                                value={newPw}
                                onChange={(e) => setNewPw(e.target.value)}
                                error={newPwError}
                                className="inp"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                type="password"
                                label="Confirm password"
                                value={newConfPw}
                                onChange={(e) => setNewConfPw(e.target.value)}
                                error={newPwError}
                                className="inp"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                className="btnInf mobile row"
                                color="warning"
                                onClick={handlePwChange}
                            >
                                Change Password
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <InfoModal
                infoText={"Password changed successfully"}
                heading={"Password changed"}
                show={showModal}
                setShow={setShowModal}
                redirecting={true}
            />

        </>
    );
}