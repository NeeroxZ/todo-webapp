import {TodoPage} from "./TodoPage";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../../stores/AuthStore";
import {Alert, AlertTitle, CircularProgress} from "@mui/material";
import PropTypes from "prop-types";
import {NoContent} from "../NoContent";
import {useTopics} from "../../stores/TopicStore";
import '../../styles/todo.css';

export const TodoTopicPage = () => {
    const { title } = useParams();
    const topic = useTopics();
    const auth = useAuth();
    const [foundTopic, setFoundTopic] = useState(null);
    const [notFound, setNotFound] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Todo: Error handling
    const searchTopicID = () => {
            if (!topic.loading) {
                setNotFound(false);
                setLoading(true);
                let newTitle = title.replaceAll("_", " ");
                let found = false;
                topic.topics.forEach((elem, i) => {
                    if (elem.titleLow === newTitle) {
                        setFoundTopic(elem);
                        found = true;
                    }
                });
                if (!found) {
                    setNotFound(true);
                }
                setLoading(false);
            }
    };

    useEffect(() => {
        searchTopicID();
    }, [title, topic.loading, auth.loginValid]);

    if (topic.loading || loading) {
        return (
            <div className={"screen_container"}>
                <div className={"progress_bar"}>
                    <CircularProgress/>
                </div>
            </div>
        );
    }

    console.log("not found: ", notFound)

    if (notFound) {
        return (<NoContent variant="topic"/>);
    }

    return (
        <>
            {foundTopic && (
                <TodoPage
                    scrollable={true}
                    showFab={true}
                    showInfo={true}
                    pageHeading={`Topic: ${foundTopic.titleMod}`}
                    topic={foundTopic}
                />
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