import {useNavigate} from "react-router-dom";
import {useState} from "react";
import pb from "../../utils/pocketbase";
import {Alert, Backdrop, CircularProgress} from "@mui/material";

export const ResetPasswordPage = () => {
    const navigator = useNavigate();
    const [mail, setMail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const requestResetLink = async() => {
        if (mail === "") {
            setError("no mail address given!")
            return;
        }


        setLoading(true);
        try {
            await pb.collection('users').requestPasswordReset(mail);
            setError(null);
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
            console.log(error.message)
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
            <div className="top"></div>
            <div className="container">
                <div className="row">
                    <div className="box">
                        <h1 className="form-name">Reset Password</h1>
                        <label>
                            <input className="placeholders" type="email" placeholder="E-Mail"
                                   onChange={(e) => {
                                       setMail(e.target.value);
                                   }}/>
                        </label>
                        <input className="btn-submit" type="submit" onClick={() => {
                            requestResetLink()
                        }} value="Reset"/>
                        <p className="forgot">
                            Don't have an account?
                            <a onClick={() => navigator("/register")}>Create new account</a>
                        </p>
                        {success && (
                            <Alert variant="filled" severity="success">
                                <strong>Link send</strong> — check your inbox!
                            </Alert>
                        )}
                        {error && (
                            <Alert variant="filled" severity="error">
                                Could not validate address
                            </Alert>
                        )}
                    </div>
                </div>
            </div>
            {loading && (
                <div className={"circularContainer"}>
                    <Backdrop open={loading}>
                        <CircularProgress/>
                    </Backdrop>
                </div>
            )}
        </>
    );
};