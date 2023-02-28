import {TodoPage} from "./TodoPage";

export const TodoDuePage = () => {
    const getTimeUntil = () => {
        return new Date();
    };

    return (
        <>
            <TodoPage
                scrollable={true}
                showFab={true}
                showInfo={true}
                pageHeading={"Due todos"}
                dateUntil={getTimeUntil()}
            />
        </>
    );
};