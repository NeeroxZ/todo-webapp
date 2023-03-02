import {useEffect, useState} from "react";
import {useAuth} from "../../stores/AuthStore";
import {Navigate, useNavigate} from "react-router-dom";
import {Alert, AlertTitle, Backdrop, CircularProgress} from "@mui/material";
import '../../styles/user.css';
import {StatusBox} from "../../components/StatusBox";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorSnackbar, setErrorSnackbar] = useState(false);

    const auth = useAuth();
    const navigator = useNavigate();

    const handleLogin = async (username, password) => {
        await auth.login(username, password)
    };

    useEffect(() => {
        if (auth.loginError) {
            setErrorSnackbar(true);
        }
    }, [auth.loginError]);

    // redirect if cookie was found
    if (auth.loginValid) {
        return (
            <Navigate to="/home" />
        )
    }

    return (
        <div className="containerParent">
            <div className="containerChild">
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
                           onClick={() => {
                               handleLogin(username, password);
                           }}
                           disabled={auth.waiting}
                    />
                    <p className="forgot">
                        <a onClick={() => navigator("/reset")}>Forgot Password?</a>
                    </p>

                    <p className="forgot"> Don't have an account?
                        <a onClick={() => navigator("/register")}> Create new acount</a></p>
                </form>
                <StatusBox type={"error"} message={"Invalid password or username"} show={errorSnackbar} setShow={setErrorSnackbar} />
            </div>
            {auth.waiting && (
                <div className={"circularContainer"}>
                    <Backdrop open={auth.waiting}>
                        <CircularProgress/>
                    </Backdrop>
                </div>
            )}
        </div>
    );
};