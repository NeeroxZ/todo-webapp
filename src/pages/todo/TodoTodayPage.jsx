import {TodoView} from "../../components/TodoView";
import {useGlobalStore} from "../../stores/GlobalStore";

export const TodoTodayPage = () => {
    const {setTabName} = useGlobalStore();
    setTabName("Today");
    const getTimeFrom = () => {
        let dt = new Date();
        dt.setUTCHours(0);
        dt.setUTCMinutes(0);
        dt.setUTCSeconds(0);
        dt.setUTCMilliseconds(0);
        return dt;
    }

    const getTimeUntil = () => {
        let dt = new Date();
        dt.setUTCHours(23);
        dt.setUTCMinutes(59);
        dt.setUTCSeconds(59);
        dt.setUTCMilliseconds(999);
        return dt;
    };

    return (
        <>
            <TodoView
                scrollable={true}
                showFab={true}
                showInfo={true}
                pageHeading={"Today todos"}
                dateFrom={getTimeFrom()}
                dateUntil={getTimeUntil()}
            />
        </>
    );
};