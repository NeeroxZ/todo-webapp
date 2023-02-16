import {TodoPage} from "./TodoPage";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../stores/AuthStore";
import {Alert, AlertTitle, Backdrop, CircularProgress} from "@mui/material";
import pb from "../utils/pocketbase";
import PropTypes from "prop-types";
import {QueryBuilder} from "../utils/queryBuilder";
import {NoContent} from "./NoContent";

export const TodoTopicPage = () => {
    const { title } = useParams();
    const {getUserId} = useAuth();
    const [topicId, setTopicId] = useState(null);
    const [notFound, setNotFound] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log(notFound);
        }
    , [notFound])

    const searchTopicID = async () => {
        setLoading(true);
        let q = new QueryBuilder();
        q.Part("user_id", "=", getUserId());
        q.And("title", "=", title);
        let res = {};
        try {
            // res = pb.collection('topics').getFullList(1000, q.Export());
            res = await pb.collection('topics').getFullList(1000, {
                filter: q.Export(),
            });
            if (res.length <= 0) {
                setNotFound(true);
                setLoading(false);
                return;
            }
            setTopicId(res[0].id);
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
    }, []);


    return (
        <>
            {topicId && (
                <TodoPage scrollable={true}  topicId={topicId} />
            )}
            {notFound && (
                <NoContent variant="topic"/>
            )}


            {loading && (
                <div className={"circularContainer"}>
                    <Backdrop open={loading}>
                        <CircularProgress/>
                    </Backdrop>
                </div>
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