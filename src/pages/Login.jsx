import {useState} from "react";
import {useAuth} from "../stores/AuthStore";
import {useNavigate} from "react-router-dom";
import "../styles/login.css";
import {Grid, TextField, Typography, Button, CircularProgress, Alert, AlertTitle} from "@mui/material";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigator = useNavigate();


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
                               disabled={auth.waiting}
                               onChange={e => setUsername(e.target.value)}/>
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField variant={"outlined"} label={"Password"} size={"small"} type={"password"} fullWidth={true}
                               disabled={auth.waiting}
                               onChange={e => setPassword(e.target.value)}/>
                </Grid>
                <Grid item xs={6} md={12}>
                    <Button variant={"contained"} fullWidth={true} onClick={() => auth.login(username, password)} disabled={auth.waiting}>
                        Login
                    </Button>
                </Grid>
                <Grid item xs={6} md={12}>
                    <Button variant={"contained"} fullWidth={true} disabled={auth.waiting}
                            onClick={() => navigator("/register")}>
                        Register
                    </Button>
                </Grid>
            </Grid>

            {auth.waiting && (
                <div className={"circularContainer"}>
                    <CircularProgress/>
                </div>
            )}
            {auth.loginError && (
                <Alert severity="error" >
                    <AlertTitle>Error</AlertTitle>
                    Login error — <strong>Please try again</strong>
                </Alert>
            )}
        </div>
    )
};