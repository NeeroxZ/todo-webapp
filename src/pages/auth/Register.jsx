import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Alert, AlertTitle, Backdrop, CircularProgress} from "@mui/material";
import pb from "../../utils/pocketbase";
export const Register = () => {
    const [username, setUsername] = useState(null);
    const [mail, setMail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confPass, setConfPass] = useState(null);
    const [mailError, setMailError] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);
    const [validError, setValidError] = useState(false);

    const navigator = useNavigate();

    const validatePassword = (confirmPassword) => {
        if (confirmPassword !== password) {
            setValidError(true);
        } else {
            setValidError(false);
            setConfPass(confirmPassword);
        }
    };

    const sendVerification = async () => {
        try {
            console.log(mail.toString())
            await pb.collection('users').requestVerification(mail.toString());
            return true;
        } catch (error) {
            console.log(error)
            setWaiting(false);
            setRegistrationError(true);
            return false;
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
            console.log(error)
            setWaiting(false);
            setRegistrationError(true);
            return
        }

        const success = await sendVerification();
        if (success) {
            navigator("/confirm");
        }

    };


    return (
        <div className="containerParent">
            <div className="containerChild">
                <div className="box">
                    <h1 className="form-name">Register</h1>
                    <label>
                        <input className={`placeholders ${mailError ? "error" : ""}`} type="text" placeholder="Email"
                               onBlur={e => {
                                   setMail(e.target.value)
                               }
                               }/>
                    </label>
                    <label>
                        <input className="placeholders" type="text" placeholder="Username"
                               onBlur={e => setUsername(e.target.value)}/>
                    </label>
                    <label>
                        <input className="placeholders" type="password" placeholder="Password"
                               onBlur={e => setPassword(e.target.value)}/>
                    </label>
                    <label>
                        <input className="placeholders" type="password" placeholder="Confirm password"
                               onBlur={e => validatePassword(e.target.value)}/>
                    </label>
                    <input className="btn-submit" type="submit" name="" value="Register"
                           onClick={() => handleRegister()}/>
                    <p className="forgot"> Already have an account?
                        <a onClick={() => navigator("/login")}>Sign in</a>
                    </p>
                </div>
            </div>
            {waiting && (
                <div className={"circularContainer"}>
                    <Backdrop open={waiting}>
                        <CircularProgress/>
                    </Backdrop>
                </div>
            )}
            {registrationError && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Login error — <strong>Please try again</strong>
                </Alert>
            )}
        </div>
    );
};