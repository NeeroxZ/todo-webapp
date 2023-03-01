import { Responsive, WidthProvider } from "react-grid-layout";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useAuth} from "../../stores/AuthStore";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const User = () => {
    const auth = useAuth();
    const name = auth.getUserId();

    return (
        <div className="item-a dash-box">
            <a href="#">
                <AccountCircleIcon/>
            </a>
            <div className="username">
                {name}
            </div>
        </div>
    );
};