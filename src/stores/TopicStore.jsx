import {createContext, useContext, useEffect, useState} from "react";
import pb from "../utils/pocketbase";
import {useAuth} from "./AuthStore";

const TopicContext = createContext(null);

export const TopicProvider = ({children}) => {
    const auth = useAuth();
    const {getUserId} = useAuth();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState([]);

    const loadTopics = async () => {
        if (auth.loginValid) {
            console.log("get topics");
            setError(false);
            setLoading(true);
            try{
                let foundTopics = await pb.collection('topics').getFullList(200, {
                    filter: `user_id="${getUserId()}"`,
                    sort: '-created'
                })
                let list = [];
                foundTopics.forEach(elem => {
                    list.push({
                        id: elem.id,
                        title: elem.title,
                        titleLow: elem.title.toLowerCase(),
                        titleParam: elem.title.toLowerCase().replaceAll(" ", "_"),
                        titleMod: modifyTopic(elem.title),
                    })
                });
                setTopics(list);
                setLoading(false);
                console.log("got topics");
            } catch (e) {
                console.log("error gettings topics: ", e);
                setError(e);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (auth.loginValid) {
            loadTopics();
        }
    }, [auth.loginValid]);



    return (
        <TopicContext.Provider value={{topics, loading, error, loadTopics}}>
            {children}
        </TopicContext.Provider>
    );
};

function modifyTopic(topicTitle) {
    let words = topicTitle.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    return words.join(' ');
}

export const useTopics = () => {
    return useContext(TopicContext);
};