import {useEffect, useState} from "react";
import {getParams} from "../utils/getParams";
import pb from "../utils/pocketbase";
import {useAuth} from "../stores/AuthStore";
import {useTopics} from "../stores/TopicStore";

export function useTodoState(todoFrameProps) {
    const {getUserId, loginValid} = useAuth();
    const tp = useTopics();

    const [todos, setTodos] = useState([]);
    const [noTodos, setNoTodos] = useState(true);

    const [reloading, setReloading] = useState(false);
    const [reloadError, setReloadError] = useState(null);

    const [initialLoading, setInitialLoading] = useState(true);
    const [initialError, setInitialError] = useState(null);

    const loadTodos = async () => {
        let res = {};
        setInitialLoading(true);
        try {
            let params = getParams(todoFrameProps, getUserId());
            res = await pb.collection('todo').getList(1, 1000, {
                filter: params,
                sort: '-due_date'
            });
            setInitialError(null);
            setTodos(res.items);
            if (res.items.length > 0) {
                setNoTodos(false);
            } else {
                setNoTodos(true);
            }
        } catch (err) {
            setInitialError(err.message);
            console.log("todo page error: ", err.message)
            setTodos([]);
        } finally {
            setInitialLoading(false);
        }
    };

    const removeTodo = async (todoId) => {
        setTodos(todos.filter(e => e.id !== todoId))
    };

    const reloadTodos = async () => {
        setReloading(true);
        setReloadError(null);
        let res = {};
        try {
            console.log("useTodoState: reload todos")
            let filters = getParams(todoFrameProps, getUserId());
            res = await pb.collection('todo').getList(1, 1000, {
                filter: filters,
                sort: '-due_date'
            });

            let resData = res.items;
            if (resData.length > 0) {
                setNoTodos(false);
            } else {
                setNoTodos(true);
            }

            console.log("useTodoState: reloaded")
            setTodos(resData);
        } catch (e) {
            setReloadError(e);
            console.log("useTodoState: error reloading todos: ", e.message)
        } finally {
            setReloading(false);
        }
    };

    return {todos, noTodos, reloading, reloadError, initialLoading, initialError,
        loadTodos, reloadTodos, removeTodo
    }
}