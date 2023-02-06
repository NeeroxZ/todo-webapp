import { Responsive, WidthProvider } from "react-grid-layout";
import "../../styles/dashboard.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const User = () => {
    return (
        <div className="item-a dash-box">
            <a href="#">
                <i className="fas fa-user-circle"></i>
            </a>
            <div className="username">
                Nick Obreiter
            </div>
        </div>
    );
};