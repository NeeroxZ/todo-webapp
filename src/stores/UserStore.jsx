import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthStore";
import pb from "../utils/pocketbase";

const UserContext = createContext(null);
export const UserProvider = ({children}) => {
    const auth = useAuth();

    const [settings, setSettings] = useState({});
    const [isLoadingSettings, setIsLoadingSettings] = useState(true);

    const [user, setUser] = useState({});
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const reloadSettings = async () => {
        await loadSettings();
    };

    const reloadUser = async () => {
        await loadUser();
    };

    const loadSettings = async () => {
        if (auth.loginValid) {
            console.log("loading settings")
            setIsLoadingSettings(true);
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
            } finally {
                setIsLoadingSettings(false);
            }
        }
    };

    const loadUser = async () => {
        if (auth.loginValid) {
            console.log("loading user")
            setIsLoadingUser(true);
            setError(null);
            try {
                let data = await pb.collection('users').getOne(auth.getUserId());
                setUser(data);
                console.log("user loaded")
            } catch (e) {
                console.log("error getting user: ", e);
                setError(e);
            } finally {
                setIsLoadingUser(false);
            }

        }
    };

    useEffect(() => {
        if (auth.loginValid) {
            loadUser();
            loadSettings();
        }
    }, [auth.loginValid]);

    useEffect(() => {
        if (isLoadingUser || isLoadingSettings) {
            setLoading(true);
        } else {
            setLoading(false);
        }

    }, [isLoadingUser, isLoadingSettings])

    return (
        <UserContext.Provider value={{
            user, reloadUser, isLoadingUser,
            settings, reloadSettings, isLoadingSettings,
            loading
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserStore = () => {
    return useContext(UserContext);
};