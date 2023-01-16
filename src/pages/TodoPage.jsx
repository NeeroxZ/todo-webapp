import '../styles/todo.css'
import {Todo} from "../components/Todo";
import {useEffect, useState} from "react";
import {useAuth} from "../stores/AuthStore";
import pb from "../utils/pocketbase";
export const TodoPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {userID} = useAuth();


    const getTodos = async () => {
        setLoading(true);
        let res = {};
        try {
            res = await pb.collection('todo').getList(1, 200, `user_id = ${userID}`);
            setData(res.items);
            setError(null);
        } catch (error) {
            setError(error);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTodos()
    }, []);

    console.log(data)

    return (
        <>
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            <ul>
                {data && data.map(function (item, i) {
                    return (
                        <li key={i}>
                            <Todo
                                id={item.id}
                            />
                        </li>
                    );
                })}
            </ul>

            {/*{!waiting && <div className={"todo-list"}>*/}
            {/*    {todos && <Todo*/}
            {/*        id={item.id}*/}
            {/*        title={todos[0].title}*/}
            {/*        saved={todos[0].saved}*/}
            {/*        complete={todos[0].done}*/}
            {/*    />}*/}
            {/*</div>}*/}
        </>
    );
};