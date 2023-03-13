import Todo from "./Todo";
import {useEffect, useState} from "react";
import {useAuth} from "../stores/AuthStore";
import pb from "../utils/pocketbase";
import PropTypes from 'prop-types';
import {NoContent} from "../pages/NoContent";
import {AddTodo} from "./AddTodo";
import {getParams} from "../utils/getParams";
import {CircularProgress} from "@mui/material";
import "../styles/todo.css"
import {EditModal} from "./modals/EditModal";
import {useTodoState} from "../hooks/useTodoState";

export const TodoView = (props) => {
    const auth = useAuth();
    const tds = useTodoState(props);

    const [initialRender, setInitialRender] = useState(true);

    const [heading, setHeading] = useState("");

    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect( () => {
        if (!initialRender && props.triggerReload !== undefined) {
            tds.loadTodos(props);
            setHeading(props.pageHeading);
            props.setReloading(false);
        } else {
            tds.loadTodos(props);
            setHeading(props.pageHeading);
        }
    }, [props.topic, auth.loginValid, props.triggerReload]);

    useEffect(() => {
        setInitialRender(false)
    }, [])

    // conditional rendering
    if (tds.initialLoading) {
        return (
            <>
                <div className={"screen_container"}>
                    <CircularProgress className={"progress_bar"}/>
                </div>
            </>
        );
    }
    if (tds.noTodos) {
        return (
            <>
                <NoContent variant="todo"/>
                {props.showFab &&
                        <AddTodo
                            reloadTodos={tds.reloadTodos}
                            reloading={tds.reloading}
                            selectedTopic={props.topic}
                            showPointer={true}
                        />
                }
            </>
        );
    }
    return (
        <>
            {tds.todos &&
            props.scrollable
                ?
                <div className="scrollContainer">
                    {props.showInfo &&
                        <div className={"tdPgHeadingContainer"}>
                            <div className={"tdPgHeading"}>{heading}</div>
                        </div>
                    }
                    <ul className="todo-list">
                        {tds.todos && tds.todos.map((item) => {
                            return (
                                <Todo
                                    key={item.id}
                                    id={item.id}
                                    data={item}
                                    reloading={tds.reloading}
                                    reloadTodos={tds.reloadTodos}
                                    setShowEdit={setShowEdit}
                                    setEditDate={setEditData}
                                    disableEdit={props.disableEdit}
                                    setTriggerCountReload={props.setTriggerCountReload}
                                />
                            );
                        })}
                    </ul>
                </div>
                :
                <>
                    {props.showInfo &&
                        <div className={"tdPgHeadingContainer"}>
                            <div className={"tdPgHeading"}>{heading}</div>
                        </div>
                    }
                    <ul className="todo-list">
                        {tds.todos && tds.todos.map((item, i) => {
                            return (
                                    <Todo
                                        key={item.id}
                                        id={item.id}
                                        data={item}
                                        disableEdit={props.disableEdit}
                                        reloadTodos={tds.reloadTodos}
                                        reloading={tds.reloading}
                                        setTriggerCountReload={props.setTriggerCountReload}
                                    />
                            );
                        })}
                    </ul>
                </>
            }
            {props.showFab &&
                <AddTodo
                    reloadOnAdd={true}
                    reloadTodos={tds.reloadTodos}
                    reloading={tds.reloading}
                    selectedTopic={props.topic}
                />
            }
            {!props.disableEdit
                &&
                <EditModal
                    todoData={editData}
                    show={showEdit}
                    setShow={setShowEdit}
                    reloading={tds.reloading}
                    reloadTodos={tds.reloadTodos}
                />
            }
        </>
    );
};

TodoView.defaultProps = {
    showInfo: false,
    selectedTopic: null,
    topic: null,
    pageHeading: "",
    loading: false,
    disableEdit: false,

    reloading: false,

    deletedFilter: false,
};

TodoView.propType = {
    // view options
    scrollable: PropTypes.bool.isRequired,
    showFab: PropTypes.bool.isRequired,
    showInfo: PropTypes.bool,
    disableEdit: PropTypes.bool,
    pageHeading: PropTypes.string,

    // reload from parent
    triggerReload: PropTypes.bool,
    reloading: PropTypes.bool,
    setReloading: PropTypes.func,

    triggerCountReload: PropTypes.bool,
    setTriggerCountReload: PropTypes.func,

    // filters
    bookmarkFilter: PropTypes.bool,
    deletedFilter: PropTypes.bool,
    doneFilter: PropTypes.bool,
    isDone: PropTypes.bool,
    topic: PropTypes.object,
    tagFilter: PropTypes.bool,
    dateFrom: PropTypes.string,
    dateUntil: PropTypes.string,
}



