import '../styles/todo.css'
import {Todo} from "../components/Todo";
import {useEffect, useState} from "react";
import {useAuth} from "../stores/AuthStore";
import pb from "../utils/pocketbase";
import PropTypes from 'prop-types';

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
            setError(null);
            setData(res.items);
        } catch (error) {
            setError(error.message);
            console.log(error)
            console.log(error.message)
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect( () => {
        async function test() {
            await getTodos();
        }

        test();
    }, []);

    return (
        <>
            {/*{loading && <Skeleton variant="rectangular" width={210} height={118} />}*/}
            {/*{error && (*/}
            {/*    <div>{`There is a problem fetching the post data - ${error}`}</div>*/}
            {/*)}*/}
            <ul>
                {data && data.map((item, i) => <li key={i}><Todo id={item.id} /></li>)}
            </ul>
        </>
    );
};

TodoPage.propType = {
    bookmarkFilter: PropTypes.bool,
    topicFilter: PropTypes.bool,
    topicID: PropTypes.number,
    tagFilter: PropTypes.bool,
    tagIDs: PropTypes.arrayOf(PropTypes.number),
    dateFilter: PropTypes.bool,
    dateFrom: PropTypes.string,
    dateUntil: PropTypes.string,
}