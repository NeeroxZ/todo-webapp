import {TodoPage} from "./TodoPage";

export const TodoTomorrowPage = () => {
    document.title = "Tomorrow";
    let time = new Date();
    time.setHours(time.getHours() + 24);

    const getTimeFrom = () => {
        let dt = new Date();
        dt.setHours(dt.getHours() + 24);
        dt.setHours(0);
        dt.setMinutes(0);
        dt.setSeconds(0);
        dt.setMilliseconds(0);
        return dt;
    }

    const getTimeUntil = () => {
        let dt = new Date();
        dt.setHours(dt.getHours() + 24);
        dt.setHours(23);
        dt.setMinutes(59);
        dt.setSeconds(59);
        dt.setMilliseconds(999);
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