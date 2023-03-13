import {TodoView} from "../../components/TodoView";
import {useGlobalStore} from "../../stores/GlobalStore";

export const TodoDonePage = () => {
    const {setTabName} = useGlobalStore();
    setTabName("Done");
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