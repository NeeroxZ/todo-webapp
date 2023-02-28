import {TodoPage} from "./TodoPage";

export const TodoSavedPage = () => {
    return (
        <>
            <TodoPage
                scrollable={true}
                showFab={true}
                showInfo={true}
                bookmarkFilter={true}
                pageHeading={"Bookmarks"}
            />
        </>
    );
};