import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";
import 'font-awesome/css/font-awesome.min.css';
import "../styles/dashboard.css";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {TodoToday} from "../components/TodoToday";
import {TodoChart} from "../components/TodoChart";
import {TodoAllPage} from "./TodoAllPage";

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = [
    { i: "user",x:0, y:0, w:1, h:1 },
    { i: "empty1",          x:1, y:0, w:0.25, h:1 },
    { i: "tasksCart",       x:2, y:0, w:1, h:1 },

    { i: "empty2",x:0, y:1, w:1, h:1 },
    { i: "empty3",x:1, y:1, w:1, h:1 },
    { i: "empty4",x:2, y:1, w:1, h:1 },

    { i: "tasksOverdue",    x:0, y:2, w:1, h:2 },
    { i: "empty5",           x:1, y:2, w:0.25, h:1 },
    { i: "tasksOverdue1",   x:2, y:2, w:1, h:2 },

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
                cols={{ lg: 3, md: 3, sm: 3, xs: 1, xxs: 1}}
                rowHeight={150}
                width={2000}
                compactType={"horizontal"}
            >
                <div className="dashboardItem" key="user">
                    User INPUT
                </div>
                <div className="empty" key="empty1">
                </div>
                <div className="dashboardItem" key="tasksCart">
                    <TodoChart/>
                </div>


                <div className="empty" key="empty2">

                </div>
                <div className="empty" key="empty3">
                </div>
                <div className="empty" key="empty4">

                </div>

                <div className="dashboardItem todoAll" key="tasksOverdue">
                    All TODOS
                    <TodoAllPage/>
                </div>
                <div className="empty" key="empty5">
                </div>
                <div className="dashboardItem" key="tasksOverdue1">
                    <TodoToday/>
                </div>


            </ResponsiveGridLayout>

        </div>
    );
};