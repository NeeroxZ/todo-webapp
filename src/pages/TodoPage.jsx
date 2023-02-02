import '../styles/todo.css'
import {Todo} from "../components/Todo";
import {useEffect, useState} from "react";
import {useAuth} from "../stores/AuthStore";
import pb from "../utils/pocketbase";
import PropTypes from 'prop-types';
import {QueryBuilder} from "../utils/queryBuilder";

export const TodoPage = (props) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noTodo, setNoTodo] = useState(null);

    const {getUserId} = useAuth();


    const getTodos = async () => {
        setLoading(true);
        let res = {};
        try {
            let params = getParams(props, getUserId());
            console.log(params);
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
        async function refresh() {
            await getTodos();
        }

        refresh();
    }, []);

    return (
        <>
            {/*{loading && <Skeleton variant="rectangular" width={210} height={118} />}*/}
            {/*{error && (*/}
            {/*    <div>{`There is a problem fetching the post data - ${error}`}</div>*/}
            {/*)}*/}
            {noTodo && (
                <div>No todos found</div>
            )}
            {data &&
                <div className="ex1">
               <ul className="todo-list">
                    {data && data.map((item, i) => <li key={i}><Todo id={item.id}/></li>)}
                </ul>
                </div>
            }
        </>
    );
};

function getParams(props, userId) {
    let q = new QueryBuilder();
    let query = `user_id="${userId}"`;
    // q.Part("user_id", "=", userId);
    if (props.bookmarkFilter) {
        query += " && saved=true";
        // q.And("saved", "=", true);
    }
    if (props.deletedFilter) {
        query += " && deleted=true"
        // q.And("deleted", "=", true);
    } else {
        query += " && deleted=false"
        // q.And("deleted", "=", false);
    }

    if (props.topicId) {
        query += ` && topic="${props.topicId}"`;
        // q.And("topic", "=", props.topicId);
    }

    if (props.tagFilter) {
        let emptyTopics = {topics: []};
        query += ` && tags!=${emptyTopics}`;
        // q.And("tags", "!=", {topics: []});
    }

    if (props.dateFrom && props.dateUntil) {
        if (props.dateFrom !== "" && props.dateUntil !== "") {

            query += ` && (due_date >="${props.dateFrom}" && due_date<="${props.dateUntil}")`;


            // q.Space().OpenBracket("&&")
            //     .Part("dueDate", ">=", props.dateFrom)
            //     .And("dueDate", "<=", props.dateUntil)
            //     .CloseBracket();
        }
    }
    return query;
    // return q.Export();


}

TodoPage.propType = {
    bookmarkFilter: PropTypes.bool,
    deletedFilter: PropTypes.bool,
    topicId: PropTypes.number,
    tagFilter: PropTypes.bool,
    dateFrom: PropTypes.string,
    dateUntil: PropTypes.string,
}