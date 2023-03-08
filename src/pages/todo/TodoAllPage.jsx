import {TodoView} from "../../components/TodoView";

export const TodoAllPage = () => {

    return (
        <>
            <TodoView
                scrollable={true}
                showFab={true}
                showInfo={true}
                pageHeading={"All todos"}
            />
        </>
    );
};