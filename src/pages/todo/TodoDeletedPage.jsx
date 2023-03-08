import {TodoView} from "../../components/TodoView";

export const TodoDeletedPage = () => {
    return (
        <>
            <TodoView
                scrollable={true}
                showFab={true}
                showInfo={true}
                deletedFilter={true}
                pageHeading={"Deleted todos"}
            />
        </>
    );
};