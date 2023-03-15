import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Backdrop, CircularProgress} from "@mui/material";
import pb from "../../utils/pocketbase";
import '../../styles/user.css';
import {validateEmail} from "../../utils/functions";
import {StatusBox} from "../../components/StatusBox";
import {useGlobalStore} from "../../stores/GlobalStore";
export const RegisterPage = () => {
    const [initialRender, setInitialRender] = useState(true);

    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState(false);

    const [mail, setMail] = useState("");
    const [mailError, setMailError] = useState(false);

    const [password, setPassword] = useState("");
    const [confPass, setConfPass] = useState("");
    const [pwError, setPwError] = useState(false);

    const [waiting, setWaiting] = useState(false);
    const [registrationError, setRegistrationError] = useState(false);
    const [disableReg, setDisableReg] = useState(true);

    const navigator = useNavigate();

    const {setTabName} = useGlobalStore();
    setTabName("DodoTodo - Register");

    // set initial render
    useEffect(() => {setInitialRender(false)}, [])

    useEffect(() => {
        if (usernameError || mailError || pwError) {
            setDisableReg(true);
        } else {
            if (!initialRender) {
                setDisableReg(false);
            }
        }

    }, [usernameError, mailError, pwError])

    const verifyPassword = (e) => {
        let vpw = e.target.value;
        if (password !== "" && password.length >= 8 && (password === vpw)) {
            setPwError(false);
        } else {
            setPwError(true);
        }

        setConfPass(vpw);
    };

    const verifyUsername = (e) => {
        if (e.target.value.length >= 4 && e.target.value.length <= 16) {
            setUsernameError(false);
        } else {
            setUsernameError(true);
        }

        setUsername(e.target.value);
    };

    const handleMailChange = (event) => {
        if (validateEmail(event.target.value)) {
            setMailError(false);
        } else if (event.target.value === "") {
            setMailError(false);
        } else {
            setMailError(true);
        }

        setMail(event.target.value);
    };

    const sendVerification = async () => {
        try {
            await pb.collection('users').requestVerification(mail.toString());
        } catch (error) {
            console.log(error)
            setRegistrationError(true);
        } finally {
            setWaiting(false);
        }
    };

    const handleRegister = async () => {
        setWaiting(true);
        setRegistrationError(false);

        if (!disableReg) {
            const data = {
                "username": username,
                "email": mail,
                "emailVisibility": false,
                "password": password,
                "passwordConfirm": confPass,
            };

            try {
                await pb.collection('users').create(data).then(async () => {
                    await sendVerification();
                    navigator("/verify");
                })
            } catch(error) {
                console.log(error)
                setRegistrationError(true);
            }
        }

    };


    return (
        <div className="containerParent">
            <div className="containerChild">
                <div className="box">
                    <h1 className="form-name">Register</h1>
                    <label className="inpLabel">
                        <input className={`registerInp placeholders ${mailError ? "invalid" : ""}`} type="text"
                               placeholder="Email"
                               onChange={(e) => setMail(e.target.value)}
                               onBlur={handleMailChange}
                        />
                    </label>
                    <label>
                        <input className={`registerInp placeholders ${usernameError ? "invalid" : ""}`}
                               type="text"
                               placeholder="Username"
                               onChange={verifyUsername}/>
                    </label>
                    <label>
                        <input className={`registerInp placeholders ${pwError ? "invalid" : ""}`}
                               type="password"
                               placeholder="Password"
                               onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <label>
                        <input className={`registerInp placeholders ${pwError ? "invalid" : ""}`}
                               type="password"
                               placeholder="Confirm password"
                               onChange={verifyPassword}/>
                    </label>
                    <input className={`btn-submit ${disableReg ? "disabled" : ""}`}
                           type="submit"
                           name="Register"
                           value="Register"
                           onClick={handleRegister}/>
                    <p className="forgot"> Already have an account?
                        <a onClick={() => navigator("/login")}>Sign in</a>
                    </p>
                </div>
            </div>
            <StatusBox
                type={"error"}
                topic={"Register"}
                message={"Please try again"}
                show={registrationError}
                setShow={setRegistrationError}/>
            {waiting && (
                <Backdrop open={waiting}>
                    <CircularProgress/>
                </Backdrop>
            )}
        </div>
    );
};