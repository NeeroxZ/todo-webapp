import { Responsive, WidthProvider } from "react-grid-layout";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useUserStore} from "../../stores/UserStore";


const ResponsiveGridLayout = WidthProvider(Responsive);

export const User = () => {
    const {user, isLoadingUser} = useUserStore();


    return (
        <div className="item-a dash-box">
            <a href="#">
                <AccountCircleIcon/>
            </a>
            <div className="username">
                {user.username}
            </div>
        </div>
    );
};