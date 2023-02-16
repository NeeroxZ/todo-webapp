import {useState} from "react";
import {useAuth} from "../stores/AuthStore";
import {Navigate, useNavigate} from "react-router-dom";
import {Alert, AlertTitle, Backdrop, CircularProgress} from "@mui/material";
import '../styles/user.css';


export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();
    const navigator = useNavigate();

    // Todo (Marvin): Forgot password navigation
    // Todo (Marvin): Register navigation

    if (auth.loginValid) {
        return (
            <Navigate to="/home" />
        )
    }

    return (
        <div className="containerLogin">
            <div className="rowLogin">
                <form className="box">
                    <h1 className="form-name">Sign In</h1>
                    <label>
                        <input className="placeholders" type="text" placeholder="Username"
                               onChange={e => setUsername(e.target.value)}
                               disabled={auth.waiting}/>
                    </label>
                    <label>
                        <input className="placeholders" type="password" placeholder="Password"
                               onChange={e => setPassword(e.target.value)}
                               disabled={auth.waiting}/>
                    </label>
                    <input className="btn-submit" type="submit" name="" value="Sign In"
                           onClick={() => auth.login(username, password)}
                           disabled={auth.waiting}
                    />
                    <p className="forgot">
                        <a onClick={() => navigator("/reset")}>Forgot Password?</a>
                    </p>

                    <p className="forgot"> Don't have an account?
                        <a onClick={() => navigator("/register")}> Create new acount</a></p>

                </form>
            </div>
            {auth.waiting && (
                <div className={"circularContainer"}>
                    <Backdrop open={auth.waiting}>
                        <CircularProgress/>
                    </Backdrop>
                </div>
            )}
            {auth.loginError && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Login error — <strong>Please try again</strong>
                </Alert>
            )}
        </div>
    );
};