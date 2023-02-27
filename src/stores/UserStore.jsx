import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthStore";
import pb from "../utils/pocketbase";

const UserContext = createContext(null);
export const UserProvider = ({children}) => {
    const auth = useAuth();

    const [settings, setSettings] = useState({});
    const [user, setUser] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const reloadSettings = async () => {
        await loadSettings();
        setLoading(false);
    };

    const reloadUser = async () => {
        await loadUser();
        setLoading(false);
    };

    const loadSettings = async () => {
        if (auth.loginValid) {
            console.log("loading settings")
            setLoading(true);
            setError(null);
            try {
                let data = await pb.collection('user_settings').getFirstListItem(
                    `user_id="${auth.getUserId()}"`
                );
                setSettings(data);
                console.log("settings loaded")
            } catch (e) {
                console.log("error getting user_settings: ", e);
                setError(e);
            }
        }
    };

    const loadUser = async () => {
        if (auth.loginValid) {
            console.log("loading user")
            setLoading(true);
            setError(null);
            try {
                let data = await pb.collection('users').getOne(auth.getUserId());
                console.log(data);
                setUser(data);
                console.log("user loaded")
            } catch (e) {
                console.log("error getting user: ", e);
                setError(e);
            }

        }
    }

    useEffect(() => {
        if (auth.loginValid) {
            loadUser();
            loadSettings();
            setLoading(false);
        }
    }, [auth.loginValid]);

    return (
        <UserContext.Provider value={{
            user, reloadUser,
            settings, reloadSettings
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserStore = () => {
    return useContext(UserContext);
};