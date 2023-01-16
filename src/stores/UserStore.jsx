import React, {createContext, useContext, useEffect, useState} from "react";
import pb from "../utils/pocketbase";

const initState = {
    darkMode: false,
    todos: null,
    topics: null,
    tags: null,
};

export const UserContext = createContext(null);

export const UserStore = ({children}) => {
    const [userId, setUserId] = useState("");

    const [topics, setTopics] = useState(null);
    const [topicWaiting, setTopicWaiting] = useState(null);
    const [topicError, setTopicError] = useState(null);

    const getTopics = async () => {
        setTopicWaiting(true);
        let resultList = {};
        try {
            resultList = await pb.collection('topics').getFullList(200, {filter: `user_id == ${userId}`});
            setTopicWaiting(false);

        } catch (error) {
            setTopicError(error);
            return
        }

        console.log(resultList);

    };

    useEffect(() => {
        if (pb.authStore.model.id !== "") {
            setUserId(pb.authStore.model.id);
        }
    }, []);






    return(
        <UserContext.Provider value={{getTopics}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserStore = () => {
    return useContext(UserContext);
};