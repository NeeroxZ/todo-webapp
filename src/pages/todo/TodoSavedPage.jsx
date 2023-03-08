import {TodoView} from "../../components/TodoView";

export const TodoSavedPage = () => {
    return (
        <>
            <TodoView
                scrollable={true}
                showFab={true}
                showInfo={true}
                bookmarkFilter={true}
                pageHeading={"Bookmarks"}
            />
        </>
    );
};