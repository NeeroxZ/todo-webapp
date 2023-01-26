import React, {createContext, useContext, useEffect, useState} from "react";
import pb from "../utils/pocketbase";

const initState = {
    darkMode: false,
    todos: null,
    topics: null,
    tags: null,
};

export const UserContext = createContext(null);

class topic {
    constructor(id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}

export const UserStore = ({children}) => {
    const [userId, setUserId] = useState("");

    const [topics, setTopics] = useState(null);
    const [topicWaiting, setTopicWaiting] = useState(null);
    const [topicError, setTopicError] = useState(null);

    const getTopics = async () => {
        let newTopics = [];
        setTopicWaiting(true);
        let resultList = {};
        try {
            resultList = await pb.collection('topics').getList(1, 50,    );
            setTopicWaiting(false);
        } catch (error) {
            setTopicError(error);
            return
        }
        for (const t of resultList.items) {
            newTopics.push(new topic(t.id, t.name, t.color))
        }

        setTopics(newTopics);
    };

    const uploadTopic = async (name, color) => {
        setTopicWaiting(true);
        const data = {
            "user_id": userId,
            "title": name,
            "color": color
        }
        try {
            await pb.collection('topics').create(data);
            setTopicWaiting(false);
        } catch (error) {
            setTopicError(error);
            setTopicWaiting(false);
        }
    }

    useEffect(() => {
        if (pb.authStore.model.id !== "") {
            setUserId(pb.authStore.model.id);
        }
    }, []);

    return(
        <UserContext.Provider value={{getTopics, uploadTopic}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserStore = () => {
    return useContext(UserContext);
};