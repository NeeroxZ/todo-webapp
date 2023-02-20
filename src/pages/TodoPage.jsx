import {Todo} from "../components/Todo";
import {useEffect, useState} from "react";
import {useAuth} from "../stores/AuthStore";
import pb from "../utils/pocketbase";
import PropTypes from 'prop-types';
import {QueryBuilder} from "../utils/queryBuilder";
import {NoContent} from "./NoContent";
import {AddTodo} from "../components/AddTodo";
import {getParams} from "../utils/getParams";
import {CircularProgress} from "@mui/material";



export const TodoPage = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [noTodo, setNoTodo] = useState(null);

    const {getUserId} = useAuth();


    const getTodos = async () => {
        setLoading(true);
        setNoTodo(false);
        setError(false);
        setData([]);
        let res = {};
        try {
            let params = getParams(props, getUserId());
            /* Todo (Marvin):   könnte zu Fehlern und performance Problemen führen,
                                wenn mehr als 1000 todos gespeichert wurden */
            res = await pb.collection('todo').getList(1, 1000, {
                filter: params,
                sort: '-due_date'
            });
            setError(null);
            setData(res.items);
            if (res.items.length <= 0) {
                setNoTodo(true);
            }
        } catch (err) {
            setError(err.message);
            console.log(err.message)
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect( () => {
        getTodos();
    }, [props.topicId]);

    if (loading) {
        return (
            <div className={"screen_container"}>
                <div className={"progress_bar"}>
                    <CircularProgress/>
                </div>
            </div>
        );
    }

    //// realtime
    // useEffect(() => {
    //     pb.collection('todo').subscribe('*', function (e) {
    //
    //     });
    //     return () => {
    //         pb.collection('todo').unsubscribe('*');
    //         console.log("unsubscribe")
    //     };
    // });

    if (noTodo) {
        return (
            <NoContent variant="todo"/>
        );
    }


    return (
        <>
            {data &&
            props.scrollable
                ?
                <div className="ex1">
                    <ul className="todo-list">
                        {data && data.map((item, i) => <li key={i}><Todo id={item.id}/></li>)}
                    </ul>
                </div>
                :
                <ul className="todo-list">
                    {data && data.map((item, i) => <li key={i}><Todo id={item.id}/></li>)}
                </ul>
            }
            {props.showFab &&
                <AddTodo/>
            }
        </>
    );
};

TodoPage.propType = {
    scrollable: PropTypes.bool.isRequired,
    showFab: PropTypes.bool.isRequired,
    bookmarkFilter: PropTypes.bool,
    deletedFilter: PropTypes.bool,
    topicId: PropTypes.number,
    tagFilter: PropTypes.bool,
    dateFrom: PropTypes.string,
    dateUntil: PropTypes.string,
}



