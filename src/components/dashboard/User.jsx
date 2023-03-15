import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useUserStore} from "../../stores/UserStore";

export const User = () => {
    const {user} = useUserStore();


    return (
        <div className="item-a dash-box">
            <a href="#">
                <AccountCircleIcon fontSize="large"/>
            </a>
            <div className="username">
                {user.username}
            </div>
        </div>
    );
};