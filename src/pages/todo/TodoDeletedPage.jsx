import {TodoView} from "../../components/TodoView";
import {useGlobalStore} from "../../stores/GlobalStore";

export const TodoDeletedPage = () => {
    const {setTabName} = useGlobalStore();
    setTabName("Deleted");
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