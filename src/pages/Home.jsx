import { Responsive, WidthProvider } from "react-grid-layout";
import 'font-awesome/css/font-awesome.min.css';
import {UserInfo} from "../components/dashboard/UserInfo";
import {Topics} from "../components/dashboard/Topics";
import {AllTodosCount} from "../components/dashboard/AllTodosCount";
import {TodoView} from "../components/TodoView";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {AddTodo} from "../components/AddTodo";
import '../styles/dashboard.css'
import React, {useEffect, useState} from "react";
import {Charty} from "../components/dashboard/Charty";
import {useGlobalStore} from "../stores/GlobalStore";
import {DashViewTwo} from "../components/dashboard/DashViewTwo";


const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = [
    {i: "user_info",        x: 0, y: 0, w: 1, h: 1, isResizable: false, isDraggable: false},
    {i: "all_todos_count",  x: 0, y: 0, w: 1, h: 1, isResizable: false, isDraggable: false},
    // {i: "empty3",           x: 1, y: 0, w: 0.5, h: 1, isResizable: false, isDraggable: false},
    {i: "topics",           x: 3, y: 0, w: 1, h: 4, isResizable: false, isDraggable: false},

    {i: "todo_list_all",    x: 0, y: 1, w: 1, h: 2, isResizable: false, isDraggable: false},
    {i: "todo_list_custom", x: 2, y: 1, w: 1, h: 2, isResizable: false, isDraggable: false},

    {i: "charts",           x: 0, y: 3, w: 2, h: 1, isResizable: false, isDraggable: false},

];


export const Home = () => {
    const {mobileView, setTabName} = useGlobalStore();
    setTabName("Home");

    const [initialRender, setInitialRender] = useState(true);

    const [triggerReload, setTriggerReload] = useState(false);
    const [triggerCountReload, setTriggerCountReload] = useState(false);

    const [allReloading, setAllReloading] = useState(false);

    const [reloadingCount, setReloadingCount] = useState(false);
    const [reloadingCharts, setReloadingCharts] = useState(false);
    const [reloadingList1, setReloadingList1] = useState(false);
    const [reloadingList2, setReloadingList2] = useState(false);

    // reloading
    useEffect(() => {
        if (!initialRender) {
            if (allReloading && (!reloadingCount && !reloadingCharts && !reloadingList1 && !reloadingList2)) {
                setAllReloading(false);
            }
        }
    }, [reloadingCount, reloadingCharts, reloadingList1, reloadingList2])

    useEffect(() => {
        if (!initialRender && triggerReload) {
            setTriggerCountReload(true);
            setReloadingCount(true);
            setReloadingList1(true);
            setReloadingList2(true);
            setAllReloading(true);

            setTriggerReload(false);
        }
    }, [triggerReload]);

    // toggle count reload
    useEffect(() => {
        if (triggerCountReload) {
            setTriggerCountReload(false);
        }
    }, [triggerCountReload])

    // toggle the initialRender state
    useEffect(() => {
        setInitialRender(false);
    }, [])


    const leftNavStyle = {
        marginRight: 10,
    }

    const getTimeUntil = () => {
        return new Date();
    };

    return (
        <div className="mainContainer">
            <ResponsiveGridLayout

                layouts={{lg: layout}}
                breakepoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 4, md: 2, sm: 2, xs: 1, xxs: 1}}
                margin={[10, 10]}
                compactType={"horizontal"}
                style={leftNavStyle}
                isDraggable={false}
                isResizable={false}
                autoSize={true}
                className="responsiveGridContainer"
            >

                <div className="dashboardItem itemLeft" key="user_info">
                    <UserInfo/>
                </div>
                <div className="dashboardItemView" key="all_todos_count">
                    <AllTodosCount
                        triggerReload={triggerCountReload}
                        reloading={reloadingCount}
                        setReloading={setReloadingCount}
                    />
                </div>

                <div className="dashboardItem" key="topics">
                    <Topics/>
                </div>


                <div className="dashboardItem" key="todo_list_all">
                    <div className={`todoHeaderDashboard ${mobileView?"mobile":""}`}>
                        All
                    </div>
                    <TodoView
                        scrollable={false}
                        showFab={false}
                        showInfo={false}
                        showDue={true}
                        disableEdit={true}

                        triggerReload={triggerReload}
                        reloading={reloadingList1}
                        setReloading={setReloadingList1}

                        triggerCountReload={triggerCountReload}
                        setTriggerCountReload={setTriggerCountReload}
                    />
                </div>

                <div className="dashboardItem" key="todo_list_custom">
                    <DashViewTwo
                        dateUntil={getTimeUntil()}

                        triggerReload={triggerReload}
                        reloading={reloadingList2}
                        setReloading={setReloadingList2}

                        triggerCountReload={triggerCountReload}
                        setTriggerCountReload={setTriggerCountReload}
                    />
                </div>

                <div className="dashboardItem todoAll" key="charts">
                    <Charty
                        triggerReload={triggerCountReload}
                        reloading={reloadingCharts}
                        setReloading={setReloadingCharts}
                    />
                </div>
            </ResponsiveGridLayout>
            <AddTodo
                reloadOnAdd={true}
                externalReload={allReloading}
                triggerExternal={triggerReload}
                setTriggerExternal={setTriggerReload}
            />
        </div>
    );
};