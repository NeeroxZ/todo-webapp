import {TodoView} from "../../components/TodoView";

export const TodoDonePage = () => {
    return (
        <>
            <TodoView
                scrollable={true}
                showFab={true}
                showInfo={true}

                doneFilter={true}
                isDone={true}

                pageHeading={"Done todos"}
            />
        </>
    );
};