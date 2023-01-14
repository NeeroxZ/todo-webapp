import {useState} from "react";
import pb from "../utils/pocketbase";
import "../styles/login.css";
import {
    Grid,
    TextField,
    Typography,
    Button,
    CircularProgress,
    Alert,
    AlertTitle,
    Backdrop
} from "@mui/material";

export const Register = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confPass, setConfPass] = useState(null)
    const [mail, setMail] = useState(null)

    const [waiting, setWaiting] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);
    const [validError, setValidError] = useState(false);

    const validatePassword = (confirmPassword) => {
        if (confirmPassword !== password) {
            setValidError(true);
        } else {
            setValidError(false);
            setConfPass(confirmPassword);
        }
    };

    const handleRegister = async () => {
        setWaiting(true);

        const data = {
            "username": username,
            "email": mail,
            "emailVisibility": false,
            "password": password,
            "passwordConfirm": confPass,
        };

        try {
           await pb.collection('users').create(data)
        } catch(error) {
            setWaiting(false);
            setRegistrationError(true);
            return
        }

        await sendVerification();

        // navigator("/todo");
    };

    const sendVerification = async () => {
        try {
            console.log(mail.toString())
            await pb.collection('users').requestVerification(mail.toString());
        } catch (error) {
            console.log(error)
            setWaiting(false);
            setRegistrationError(true);
        }
    };


    return (
    <div className="registerContainer">
        <div className="containerHeader">
            <Typography variant={"h4"}>
                Register
            </Typography>
        </div>
        <Grid container spacing={1.5} className={"inputGrid"}>
            <Grid item xs={12} md={12}>
                <TextField variant={"outlined"} label={"Username"} size={"small"} fullWidth={true}
                           disabled={waiting}
                           onChange={e => setUsername(e.target.value)}/>
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField variant={"outlined"} label={"E-Mail"} size={"small"} fullWidth={true}
                           disabled={waiting}
                           onChange={e => setMail(e.target.value)}/>
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField variant={"outlined"} label={"Password"} size={"small"} type={"password"} fullWidth={true}
                           disabled={waiting}
                           onChange={e => setPassword(e.target.value)}/>
            </Grid>
            <Grid item xs={12} md={12}>
                <TextField variant={"outlined"} label={"Repeat password"} size={"small"} type={"password"} fullWidth={true}
                           disabled={waiting}
                           error={validError}
                           onChange={e => validatePassword(e.target.value)}
                />
            </Grid>
            <Grid item xs={6} md={12}>
                <Button variant={"contained"} fullWidth={true} onClick={handleRegister} disabled={waiting}>
                    Register
                </Button>
            </Grid>
        </Grid>
            <div className={"circularContainer"}>
                <Backdrop open={waiting}>
                    <CircularProgress/>
                </Backdrop>
            </div>
        {registrationError && (
            <Alert severity="error" >
                <AlertTitle>Error</AlertTitle>
                Could not register — <strong>Something went wrong!</strong>
            </Alert>
        )}
    </div>
)
};