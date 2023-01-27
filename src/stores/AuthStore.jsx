import {useState, createContext, useContext} from "react";
import pb from "../utils/pocketbase";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [waiting, setWaiting] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const navigator = useNavigate();


    // login
    const login = async (username, password) => {
        if (loginError) setLoginError(false);

        setWaiting(true);
        try {
            await pb.collection('users').authWithPassword(
                username,
                password
            )
        } catch(error) {
            setWaiting(false);
            setLoginError(true);
            return
        }
        setWaiting(false);

        if (!pb.authStore.isValid) {
            setWaiting(false);
            setLoginError(true);
            return
        }

        setWaiting(false);
        setLoginSuccess(true);
        navigator("/home");
    };

    // logout
    const logout = async () => {
        pb.authStore.clear()
        navigator("/login")
    };

    const getUserId = () => {
        return pb.authStore.model.id;
    };

    return(
        <AuthContext.Provider value={{login, logout, loginError, waiting, loginSuccess, getUserId}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
};