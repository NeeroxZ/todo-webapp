import { Responsive, WidthProvider } from "react-grid-layout";
import 'font-awesome/css/font-awesome.min.css';
import {UserInfo} from "../components/dashboard/UserInfo";
import {Category} from "../components/dashboard/Category";
import {View} from "../components/dashboard/View";
import {TodoPage} from "./todo/TodoPage";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {TodoChart} from "../components/TodoChart";
import {AddTodo} from "../components/AddTodo";
import '../styles/dashboard.css'


const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = [
        { i: "empty",            x:0, y:0, w:1, h:1 , static: true},
        { i: "empty2",           x:1, y:0, w:1, h:1 , static: true},
        { i: "empty4",           x:3, y:0, w:1, h:4 },

        { i: "empty5",           x:0, y:1, w:1, h:2,  },
        //{ i: "empty6",           x:1, y:1, w:1, h:1 },
        { i: "empty7",           x:2, y:1, w:1, h:2 },

        { i: "empty8",           x:0, y:3, w:2, h:1  },

];


export const Dashboard = () => {
    const leftNavStyle = {


        marginRight: 10,

    }
    return (
        <div className="mainContainer">
            <ResponsiveGridLayout
                layouts={{lg: layout}}
                breakepoints={{ lg:1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 4, md: 2, sm: 2, xs: 1, xxs: 1}}
                margin= {[10, 10]}
                compactType={"horizontal"}
                style={leftNavStyle}
                isDraggable={false}
                isResizable= {false}
                autoSize={true}
            >

                <div className="dashboardItem itemLeft" key="empty" >
                    <UserInfo/>
                </div>
                <div className="dashboardItemView" key="empty2">
                    <View/>
                </div>

                <div className="dashboardItem" key="empty4">
                    <Category/>
                </div>


                <div className="dashboardItem" key="empty5">
                    <div className="todoHeaderDashboard">
                        TODO`S
                    </div>
                    <TodoPage scrollable={false} showFab={false} showInfo={false} showDue={true}/>
                </div>

                <div className="dashboardItem" key="empty7">
                    <div className="todoHeaderDashboard">
                        DUE`S
                    </div>
                    <TodoPage scrollable={false} showFab={false} showInfo={false}/>
                </div>

                <div className="dashboardItem todoAll" key="empty8">
                    <TodoChart/>
                </div>
            </ResponsiveGridLayout>
            <AddTodo/>
        </div>
    );
};