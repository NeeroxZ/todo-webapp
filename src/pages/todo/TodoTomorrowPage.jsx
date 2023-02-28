import {TodoPage} from "./TodoPage";

export const TodoTomorrowPage = () => {
    document.title = "Tomorrow";
    const getTimeFrom = () => {
        let dt = new Date();
        dt.setUTCDate(dt.getUTCDate() + 1);
        dt.setUTCHours(0);
        dt.setUTCMinutes(0);
        dt.setUTCSeconds(0);
        dt.setUTCMilliseconds(0);
        return dt;
    }

    const getTimeUntil = () => {
        let dt = new Date();
        dt.setUTCDate(dt.getUTCDate() + 1);
        dt.setUTCHours(23);
        dt.setUTCMinutes(59);
        dt.setUTCSeconds(59);
        dt.setUTCMilliseconds(999);
        return dt;
    };

    return (
        <>
            <TodoPage
                scrollable={true}
                showFab={true}
                showInfo={true}
                pageHeading={"Tomorrow todos"}
                dateFrom={getTimeFrom()}
                dateUntil={getTimeUntil()}
            />
        </>
    );
};