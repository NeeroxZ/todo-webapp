import Todo from "../../components/Todo";
import {useEffect, useState} from "react";
import {useAuth} from "../../stores/AuthStore";
import pb from "../../utils/pocketbase";
import PropTypes from 'prop-types';
import {NoContent} from "../NoContent";
import {AddTodo} from "../../components/AddTodo";
import {getParams} from "../../utils/getParams";
import {CircularProgress} from "@mui/material";
import "../../styles/todo.css"
import {EditModal} from "../../components/modals/EditModal";
import {useTodoState} from "../../hooks/useTodoState";

export const TodoPage = (props) => {
    const auth = useAuth();
    const tds = useTodoState(props);

    const [heading, setHeading] = useState("");

    const [showEdit, setShowEdit] = useState(false);
    const [editData, setEditData] = useState({});


    useEffect( () => {
        tds.loadTodos(props);
        setHeading(props.pageHeading);
    }, [props.topic, auth.loginValid]);

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
                            reloadFunction={tds.reloadTodos}
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
                                    />
                            );
                        })}
                    </ul>
                </>
            }
            {props.showFab &&
                <AddTodo
                    reloadOnAdd={true}
                    reloadFunction={tds.reloadTodos}
                    loading={tds.reloading}
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

TodoPage.defaultProps = {
    showInfo: false,
    selectedTopic: null,
    topic: null,
    pageHeading: "",
    loading: false,
    disableEdit: false,
};

TodoPage.propType = {
    scrollable: PropTypes.bool.isRequired,
    showFab: PropTypes.bool.isRequired,
    showInfo: PropTypes.bool,
    disableEdit: PropTypes.bool,
    pageHeading: PropTypes.string,
    bookmarkFilter: PropTypes.bool,
    deletedFilter: PropTypes.bool,
    topic: PropTypes.object,
    tagFilter: PropTypes.bool,
    dateFrom: PropTypes.string,
    dateUntil: PropTypes.string,
}



