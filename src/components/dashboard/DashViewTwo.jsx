import {useUserStore} from "../../stores/UserStore";
import {TodoView} from "../TodoView";
import React from "react";
import {useGlobalStore} from "../../stores/GlobalStore";
import {getTodayTime, getTomorrowTime, getTwoAheadTime} from "../../utils/time";
import PropTypes from "prop-types";

export const DashViewTwo = (props) => {
    const {settings, isLoadingSettings} = useUserStore();
    const {mobileView} = useGlobalStore();

    if (isLoadingSettings || settings["dashboardTwo"] === "") {
        return null;
    }

    console.log(settings["dashboardTwo"])
    switch (settings["dashboardTwo"]) {
        case "today":
            return (
                <>
                    <div className={`todoHeaderDashboard ${mobileView?"mobile":""}`}>
                        Today
                    </div>
                    <TodoView
                        scrollable={false}
                        showFab={false}
                        showInfo={false}
                        showDue={false}
                        disableEdit={true}
                        dateFrom={getTodayTime()}
                        dateUntil={getTomorrowTime()}

                        triggerReload={props.triggerReload}
                        reloading={props.reloading}
                        setReloading={props.setReloading}

                        triggerCountReload={props.triggerCountReload}
                        setTriggerCountReload={props.setTriggerCountReload}
                    />
                </>
            );
        case "tomorrow":
            return (
                <>
                    <div className={`todoHeaderDashboard ${mobileView?"mobile":""}`}>
                        Tomorrow
                    </div>
                    <TodoView
                        scrollable={false}
                        showFab={false}
                        showInfo={false}
                        showDue={false}
                        disableEdit={true}
                        dateFrom={getTomorrowTime()}
                        dateUntil={getTwoAheadTime()}

                        triggerReload={props.triggerReload}
                        reloading={props.reloading}
                        setReloading={props.setReloading}

                        triggerCountReload={props.triggerCountReload}
                        setTriggerCountReload={props.setTriggerCountReload}
                    />
                </>
            );
        case "due":
            return (
                <>
                    <div className={`todoHeaderDashboard ${mobileView?"mobile":""}`}>
                        Due
                    </div>
                    <TodoView
                        scrollable={false}
                        showFab={false}
                        showInfo={false}
                        showDue={false}
                        disableEdit={true}
                        dateUntil={new Date()}

                        triggerReload={props.triggerReload}
                        reloading={props.reloading}
                        setReloading={props.setReloading}

                        triggerCountReload={props.triggerCountReload}
                        setTriggerCountReload={props.setTriggerCountReload}
                    />
                </>
            );
        case "saved":
            return (
                <>
                    <div className={`todoHeaderDashboard ${mobileView?"mobile":""}`}>
                        Saved
                    </div>
                    <TodoView
                        scrollable={false}
                        showFab={false}
                        showInfo={false}
                        showDue={false}
                        disableEdit={true}
                        bookmarkFilter={true}

                        triggerReload={props.triggerReload}
                        reloading={props.reloading}
                        setReloading={props.setReloading}

                        triggerCountReload={props.triggerCountReload}
                        setTriggerCountReload={props.setTriggerCountReload}
                    />
                </>
            );
    }
};

DashViewTwo.propTypes = {
    triggerReload: PropTypes.bool.isRequired,
    reloading: PropTypes.bool.isRequired,
    setReloading: PropTypes.func.isRequired,
    triggerCountReload: PropTypes.bool.isRequired,
    setTriggerCountReload: PropTypes.func.isRequired,
}