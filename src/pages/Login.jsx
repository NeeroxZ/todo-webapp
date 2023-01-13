import {useState} from "react";
import {useAuth} from "../stores/AuthStore";
import {useNavigate} from "react-router-dom";
import pb from "../utils/pocketbase";
import "../styles/login.css";
import {Grid, Container, Input, TextField, Typography, Button, CircularProgress, Alert, AlertTitle} from "@mui/material";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const auth = useAuth();
    const navigator = useNavigate();



    const handleLogin = async () => {
        if (loginError) setLoginError(false);

        setWaiting(true);
        try {
             await pb.collection('users').authWithPassword(
                username,
                password
            )
        } catch(error) {
            console.log(error)
            setWaiting(false);
            setLoginError(true);
            return
        }
        setWaiting(false);

        pb.authStore.exportToCookie({}, 'token')

        if (!pb.authStore.isValid) {
            setLoginError(true);
            return
        }
        auth.login(pb.authStore.token);
        navigator("/home");
    };

    return (
        <div className="loginContainer">
            <div className="containerHeader">
                <Typography variant={"h4"}>
                    Login
                </Typography>
            </div>
            <Grid container spacing={1.5} className={"inputGrid"}>
                <Grid item xs={12} md={12}>
                    <TextField variant={"outlined"} label={"Username"} size={"small"} fullWidth={true}
                               disabled={waiting}
                               onChange={e => setUsername(e.target.value)}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField variant={"outlined"} label={"Password"} size={"small"} type={"password"} fullWidth={true}
                               disabled={waiting}
                               onChange={e => setPassword(e.target.value)}/>
                </Grid>
                <Grid item xs={6} md={12}>
                    <Button variant={"contained"} fullWidth={true} onClick={handleLogin} disabled={waiting}>
                        Login
                    </Button>
                </Grid>
                <Grid item xs={6} md={12}>
                    <Button variant={"contained"} fullWidth={true} disabled={waiting}
                            onClick={() => navigator("/register")}>
                        Register
                    </Button>
                </Grid>
            </Grid>

            {waiting && (
                <div className={"circularContainer"}>
                    <CircularProgress/>
                </div>
            )}
            {loginError && (
                <Alert severity="error" >
                    <AlertTitle>Error</AlertTitle>
                    Login error — <strong>Please try again</strong>
                </Alert>
            )}
        </div>
    )
};