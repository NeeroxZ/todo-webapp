import {TodoPage} from "./TodoPage";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

export const TopicPage = () => {
    const { name } = useParams();

    useEffect(() => {

    }, []);


    return(
        <>
            <TodoPage />
        </>
    );
};