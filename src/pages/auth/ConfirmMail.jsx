import '../../styles/user.css'
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";


export const ConfirmMailPage = () => {
    const navigator = useNavigate();
    return (
        <>
            <div className={"staticAbsoluteContainer"}>
                <div className={"staticContainer"}>
                    <div className={"staticHeading"}>
                        Thanks for signing up!
                    </div>
                    <div className={"staticBody"}>
                        Please your registered email for verification
                    </div>
                    <div className={"staticLabel"}>
                        (Please check your spam or junk mail folder)
                    </div>
                    <div className={"staticLoginReturn"}>
                        <Link color={"primary"} onClick={() => {navigator("/login")}}>
                            Return to login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};