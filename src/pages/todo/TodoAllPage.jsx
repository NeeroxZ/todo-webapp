import {TodoView} from "../../components/TodoView";
import {useGlobalStore} from "../../stores/GlobalStore";

export const TodoAllPage = () => {
    const {setTabName} = useGlobalStore();
    setTabName("All");

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