import { Responsive, WidthProvider } from "react-grid-layout";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const User = () => {
    return (
        <div className="item-a dash-box">
            <a href="#">
                <AccountCircleIcon/>
            </a>
            <div className="username">
                NeeroxZ
            </div>
        </div>
    );
};