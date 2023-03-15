import '../../styles/user.css'
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useGlobalStore} from "../../stores/GlobalStore";


export const NotVerifiedPage = () => {
    const navigator = useNavigate();

    const {setTabName} = useGlobalStore();
    setTabName("DodoTodo - Not confirmed");

    return (
        <>
            <div className={"staticAbsoluteContainer"}>
                <div className={"staticContainer"}>
                    <div className={"staticHeading"}>
                        Mail not verified yet
                    </div>
                    <div className={"staticBody"}>
                        Check your mail inbox for and follow the instructions for verification
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