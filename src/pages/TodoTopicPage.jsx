import {TodoPage} from "./TodoPage";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../stores/AuthStore";
import {Alert, AlertTitle, Backdrop, CircularProgress} from "@mui/material";
import pb from "../utils/pocketbase";
import PropTypes from "prop-types";
import {QueryBuilder} from "../utils/queryBuilder";
import {NoContent} from "./NoContent";
import {useTopics} from "../stores/TopicStore";
import '../styles/todo.css';

export const TodoTopicPage = () => {
    const { title } = useParams();
    const topic = useTopics();
    const {getUserId} = useAuth();
    const [topicId, setTopicId] = useState(null);
    const [notFound, setNotFound] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const searchTopicID = async () => {
        setLoading(true);
        let newTitle = title.replaceAll("_", " ");
        let req = `user_id="${getUserId()}"`;
        let res = {};
        try {
            res = await pb.collection('topics').getFullList(1000, {
                filter: req,
            });

            if (res.length <= 0) {
                setNotFound(true);
                setLoading(false);
                return;
            }

            let topicId = "";

            res.forEach(element => {
                if (element.title.toLowerCase() === newTitle) {
                    setTopicId(element.id);
                    topicId = element.id;
                }
            });

            if (topicId !== "") {
                setTopicId(topicId);
            } else {
                setNotFound(true);
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
            setError(e);
        }

    };

    useEffect(() => {
        async function refresh() {
            await searchTopicID();
        }
        refresh();
    }, [title]);

    if (topic.waiting || loading) {
        return (
            <>
                <CircularProgress />
            </>
        );
    }

    return (
        <>
            {loading && (
                <div className={"screen_container"}>
                    <div className={"progress_bar"}>
                        <Backdrop open={loading}>
                            <CircularProgress/>
                        </Backdrop>
                    </div>
                </div>
            )}
            {topicId && (
                <TodoPage
                    scrollable={true}
                    showFab={true}
                    topicId={topicId}
                />
            )}
            {notFound && (
                <NoContent variant="topic"/>
            )}

            {error && (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Database error — <strong>Please try again</strong>
                </Alert>
            )}
        </>
    );
};

TodoPage.propType = {
    bookmarkFilter: PropTypes.bool,
    deletedFilter: PropTypes.bool,
    topicFilter: PropTypes.bool,
    topicID: PropTypes.number,
    tagFilter: PropTypes.bool,
    dateFilter: PropTypes.bool,
    dateFrom: PropTypes.string,
    dateUntil: PropTypes.string,
}