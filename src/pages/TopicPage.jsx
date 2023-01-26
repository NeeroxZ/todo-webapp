import {TodoPage} from "./TodoPage";
import {useParams} from "react-router-dom";

export const TopicPage = () => {
    const { id } = useParams();

    return(
        <>
            <TodoPage />
        </>
    );
};