import {useEffect} from "react";
import {useTodoState} from "../../hooks/useTodoState";
import {useAuth} from "../../stores/AuthStore";



export const View = (props) => {
    const auth = useAuth();
    const tds = useTodoState(props);
    useEffect( () => {
        tds.loadTodos(props);
    }, [props.topic, auth.loginValid]);


    return(
        <div className="item-c dash-box">
            <div>
                <a className="">All ToDo`s:</a>
                <div className="cash-font-md gradient-font allNmb" data-target="1194.09">{tds.todos.length}</div>
            </div>
        </div>
    )
}