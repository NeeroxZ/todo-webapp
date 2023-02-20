import {TodoPage} from "./TodoPage";

export const TodoTomorrowPage = () => {
    let time = new Date();
    time.setUTCDate(time.getDate() + 1);
    let tomorrow = (time.getUTCFullYear() + "-" + ('0' + (time.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + time.getUTCDate()).slice(-2));

    const getTimeFrom = () => {
        return `${tomorrow} 00:00:00.000`;
    }

    const getTimeUntil = () => {
        return `${tomorrow} 23:59:59.999`;
    };

    return (
        <>
            <TodoPage
                scrollable={true}
                showFab={true}
                dateFrom={getTimeFrom()}
                dateUntil={getTimeUntil()}
            />
        </>
    );
};