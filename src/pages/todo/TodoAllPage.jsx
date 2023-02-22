import {TodoPage} from "./TodoPage";

export const TodoAllPage = () => {

    return (
        <>
            <TodoPage
                scrollable={true}
                showFab={true}
                showInfo={true}
                pageHeading={"All todos"}
            />
        </>
    );
};