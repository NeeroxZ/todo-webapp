import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";
import 'font-awesome/css/font-awesome.min.css';
import "../styles/dashboard.css";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {TodoToday} from "../components/TodoToday";
import {TodoChart} from "../components/TodoChart";
import {TodoAllPage} from "./TodoAllPage";
import {UserInfo} from "../components/dashboard/UserInfo";
import {User} from "../components/dashboard/User";
import {Category} from "../components/dashboard/Category";

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = [
        { i: "empty",            x:0, y:0, w:1, h:1 },
        { i: "empty2",           x:1, y:0, w:1, h:1 },
        { i: "empty3",           x:2, y:0, w:1, h:1 },
        { i: "empty4",           x:3, y:0, w:1, h:4 },

        { i: "empty5",           x:0, y:1, w:1, h:2 },
        { i: "empty6",           x:1, y:1, w:1, h:1 },
        { i: "empty7",           x:2, y:1, w:1, h:2 },

        { i: "empty8",           x:0, y:3, w:3, h:1 },

];

export const Dashboard = () => {
    return (
        <div className="">
            <Fab size="medium" color="primary" aria-label="add" className="addIcon">
                <AddIcon />
            </Fab>
            <ResponsiveGridLayout
                layouts={{lg: layout}}
                breakepoints={{ lg:1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 4, md: 3, sm: 3, xs: 1, xxs: 1}}
                rowHeight={150}
                width={2000}
                compactType={"horizontal"}
            >

                <div className="dashboardItem" key="empty" >
                    <UserInfo/>
                </div>
                <div className="dashboardItem" key="empty2">
                    empty1
                </div>
                <div className="dashboardItem" key="empty3">
                    empty3
                </div>
                <div className="dashboardItem" key="empty4">
                    <Category/>
                </div>


                <div className="dashboardItem" key="empty5">
                    TODO`S
                    <TodoAllPage/>
                </div>
                <div className="dashboardItem" key="empty6">
                    empty6
                </div>
                <div className="dashboardItem" key="empty7">
                    empty7
                </div>

                <div className="dashboardItem todoAll" key="empty8">
                    All TODOS
                </div>



            </ResponsiveGridLayout>

        </div>
    );
};