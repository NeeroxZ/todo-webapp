import {TodoView} from "../../components/TodoView";

export const TodoDuePage = () => {
    const getTimeUntil = () => {
        return new Date();
    };

    return (
        <>
            <TodoView
                scrollable={true}
                showFab={true}
                showInfo={true}
                pageHeading={"Due todos"}
                dateUntil={getTimeUntil()}
            />
        </>
    );
};