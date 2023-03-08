import { Responsive, WidthProvider } from "react-grid-layout";
import 'font-awesome/css/font-awesome.min.css';
import {UserInfo} from "../components/dashboard/UserInfo";
import {Category} from "../components/dashboard/Category";
import {AllTodosCount} from "../components/dashboard/AllTodosCount";
import {TodoView} from "../components/TodoView";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {TodoChart} from "../components/TodoChart";
import {AddTodo} from "../components/AddTodo";
import '../styles/dashboard.css'
import {TodoDuePage} from "./todo/TodoDuePage";
import React, {useEffect, useState} from "react";


const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = [
        { i: "empty",            x:0, y:0, w:1, h:1 , isResizable: false, isDraggable: false},
        { i: "empty2",           x:1, y:0, w:1, h:1 , isResizable: false, isDraggable: false},
        { i: "empty4",           x:3, y:0, w:1, h:4, isResizable: false, isDraggable: false },

        { i: "empty5",           x:0, y:1, w:1, h:2, isResizable: false, isDraggable: false  },
        { i: "empty7",           x:2, y:1, w:1, h:2, isResizable: false, isDraggable: false },

        { i: "empty8",           x:0, y:3, w:2, h:1, isResizable: false, isDraggable: false  },

];


export const Dashboard = () => {

    const [initialRender, setInitialRender] = useState(true);

    const [triggerReload, setTriggerReload] = useState(false);
    const [triggerCountReload, setTriggerCountReload] = useState(false);

    const [allReloading, setAllReloading] = useState(false);

    const [reloadingCount, setReloadingCount] = useState(false);
    const [reloadingList1, setReloadingList1] = useState(false);
    const [reloadingList2, setReloadingList2] = useState(false);

    // reloading
    useEffect(() => {

        if (!initialRender) {
            if (allReloading && (!reloadingCount && !reloadingList1 && !reloadingList2)) {
                setAllReloading(false);
            }
        }
    }, [reloadingCount, reloadingList1, reloadingList2])
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

                <div className="dashboardItem itemLeft" key="empty">
                    <UserInfo/>
                </div>
                <div className="dashboardItemView" key="empty2">
                    <AllTodosCount
                        triggerReload={triggerCountReload}
                        reloading={reloadingCount}
                        setReloading={setReloadingCount}
                    />
                </div>

                <div className="dashboardItem" key="empty4">
                    <Category/>
                </div>


                <div className="dashboardItem" key="empty5">
                    <div className="todoHeaderDashboard">
                        Todo's
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

                <div className="dashboardItem" key="empty7">
                    <div className="todoHeaderDashboard">
                        Due's
                    </div>
                    <TodoView
                        scrollable={false}
                        showFab={false}
                        showInfo={false}
                        showDue={false}
                        disableEdit={true}
                        dateUntil={getTimeUntil()}

                        triggerReload={triggerReload}
                        reloading={reloadingList2}
                        setReloading={setReloadingList2}

                        triggerCountReload={triggerCountReload}
                        setTriggerCountReload={setTriggerCountReload}
                    />
                </div>

                <div className="dashboardItem todoAll" key="empty8">
                    <TodoChart/>
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