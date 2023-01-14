import {useState, createContext, useContext} from "react";
import pb from "../utils/pocketbase";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [waiting, setWaiting] = useState(false);
    const [loginError, setLoginError] = useState(null);

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
            console.log(error)
            setWaiting(false);
            setLoginError(true);
            return
        }
        setWaiting(false);

        console.log(pb.authStore.token)
        console.log(pb.authStore.isValid)

        const test = pb.authStore.exportToCookie({}, 'token')
        console.log(test)

        if (!pb.authStore.isValid) {
            setLoginError(true);
            return
        }
        navigator("/home");
    };

    // logout
    const logout = async () => {
        pb.authStore.clear()
        navigator("/login")
    };

    return(
        <AuthContext.Provider value={{login, logout, loginError, waiting}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
};