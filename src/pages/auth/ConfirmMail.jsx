import '../../styles/user.css'
import {Button} from "@mui/material";
import {useState} from "react";
import {StatusBox} from "../../components/StatusBox";
export const ConfirmMailPage = () => {
    const [state, setState] = useState(false);

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
                        <Button variant="contained" onClick={() => setState(true)}>
                            TOGGLE
                        </Button>
                    </div>
                </div>
            </div>
            <StatusBox type="error" message="hhuuhu" show={state} setShow={setState} />
        </>
    );
};