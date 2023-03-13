import {TodoView} from "../../components/TodoView";
import {useGlobalStore} from "../../stores/GlobalStore";

export const TodoDuePage = () => {
    const {setTabName} = useGlobalStore();
    setTabName("Due");
    const getTimeUntil = () => {
        return new Date();
    };

    return (
        <>
            <TodoView
                scrollable={true}
                showFab={true}
                showInfo={true}
                pageHeading={"Due todos"}
                dateUntil={getTimeUntil()}
            />
        </>
    );
};