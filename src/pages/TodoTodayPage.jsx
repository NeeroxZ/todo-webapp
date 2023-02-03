import {TodoPage} from "./TodoPage";

export const TodoTodayPage = () => {
    let time = new Date();
    let currentDate = (time.getUTCFullYear() + "-" +  ('0' + (time.getUTCMonth()+1)).slice(-2) + '-'
        + ('0' + time.getUTCDate()).slice(-2))

    console.log(currentDate)
    // let currentDatetime = `${currentDate} ${currentTime}`;
    const getTimeFrom = () => {
        return `${currentDate} 00:00:00.000`;
    }

    const getTimeUntil = () => {
        return `${currentDate} 23:59:59.999`;
    };

    return (
        <>
            <TodoPage scrollable={true} dateFrom={getTimeFrom()} dateUntil={getTimeUntil()} />
        </>
    );
};