import { Responsive, WidthProvider } from "react-grid-layout";
import {User} from "./User";
import "../../styles/dashboard.css";




export const UserInfo = () => {
    return (
        <div className="userInfo">

                <div className="userItem" key="empty">
                    <User/>
                </div>
                <div className="userItem" key="empty2">
                    03.02
                </div>
        </div>
    );
};