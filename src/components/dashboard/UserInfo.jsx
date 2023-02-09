import { Responsive, WidthProvider } from "react-grid-layout";
import {User} from "./User";
import {DateDay} from "./DateDay";




export const UserInfo = () => {
    return (
        <div className="userInfo">

                <div className="userItem" key="empty">
                    <User/>
                </div>
                <div className="userItem" key="empty2">
                    <DateDay/>
                </div>
        </div>
    );
};