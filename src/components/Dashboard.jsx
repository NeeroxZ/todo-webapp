import { Responsive, WidthProvider } from "react-grid-layout";
import {TodoChart} from "../components/TodoChart";
import {TodoToday} from "../components/TodoToday";

const ResponsiveGridLayout = WidthProvider(Responsive);
const usrName = "BOI";

const layout = [
    { i: "tasksDone", x:0, y:0, w:1, h:1 },
    { i: "tasksToday", x:0, y:0, w:1, h:1 },
    { i: "tasksCart", x:0, y:0, w:1, h:1 },
    { i: "tasksOverdue", x:0, y:0, w:1, h:1 },
    { i: "asdf5", x:0, y:0, w:1, h:1 },
    { i: "asdf6", x:0, y:0, w:1, h:1 }
];

export const UserDashboard = () => {
    return (
        <ResponsiveGridLayout
            layouts={{lg: layout}}
            breakepoints={{ lg:1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1}}
            rowHeight={300}
            width={1000}
        >
            <div>
                Hello {usrName}
            </div>
            <div key="tasksDone">

            </div>
            <div key="tasksDone">

            </div>
            <div key="todoToday">
                <TodoToday/>
            </div>
            <div key="tasksCart">
                <TodoChart/>
            </div>
            <div key="tasksOverdue">

            </div>
            <div key="asdf5">

            </div>
            <div key="asdf6">

            </div>
        </ResponsiveGridLayout>
    );
};