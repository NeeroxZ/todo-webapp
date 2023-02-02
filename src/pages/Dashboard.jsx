import styled from "styled-components";
import { Responsive, WidthProvider } from "react-grid-layout";
import 'font-awesome/css/font-awesome.min.css';
import "../styles/dashboard.css";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {TodoToday} from "../components/TodoToday";
import {TodoChart} from "../components/TodoChart";

const ResponsiveGridLayout = WidthProvider(Responsive);
const usrName = "BOI";

const layout = [
    { i: "tasksDone", x:0, y:0, w:1, h:1 },
    { i: "tasksToday", x:0, y:0, w:1, h:1 },
    { i: "tasksCart", x:0, y:0, w:1, h:1 },
    { i: "tasksOverdue", x:0, y:0, w:1, h:1 }
];





export const Dashboard = () => {
    return (
        <div className="dashBoardContainer">
            <Fab size="medium" color="primary" aria-label="add" className="addIcon">
                <AddIcon />
            </Fab>
            <ResponsiveGridLayout
                layouts={{lg: layout}}
                breakepoints={{ lg:1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 3, md: 3, sm: 3, xs: 2, xxs: 1}}
                rowHeight={150}
                width={1000}
                compactType={"horizontal"}
            >
                <div>
                    Hello {usrName}
                </div>
                <div className="dashboardItem" key="tasksDone">
                    pleb
                </div>
                <div className="dashboardItem" key="todoToday">
                    <TodoToday/>
                </div>
                <div className="dashboardItem" key="tasksCart">
                    <TodoChart/>
                </div>
                <div className="dashboardItem" key="tasksOverdue">
                    FooBar
                </div>
            </ResponsiveGridLayout>

        </div>
    );
};