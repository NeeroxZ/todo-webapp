import {TodoView} from "../../components/TodoView";
import {useGlobalStore} from "../../stores/GlobalStore";

export const TodoSavedPage = () => {
    const {setTabName} = useGlobalStore();
    setTabName("Saved");
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