import {useState, createContext, useContext, useEffect} from "react";
import pb from "../utils/pocketbase";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie/es6";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [waiting, setWaiting] = useState(true);
    const [loginError, setLoginError] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginValid, setLoginValid] = useState(false);

    const navigator = useNavigate();

    const cookies = new Cookies();
    const COOKIE_KEY = "auth";

    const loadCookie = async () => {
        console.log("loading cookie");
        try {
            let foundCookie = cookies.get(COOKIE_KEY)
            if (foundCookie === undefined) {
                setLoginValid(false);
                setWaiting(false);
                return;
            }
            try {
                pb.authStore.loadFromCookie(foundCookie, COOKIE_KEY);
                pb.authStore.isValid && await pb.collection('users').authRefresh();
                if (!pb.authStore.isValid) {
                    setLoginValid(false);
                    setWaiting(false);
                    await logout();
                } else {
                    setLoginValid(true);
                    setWaiting(false);
                }
            } catch (e) {
                await logout()
            }

        }
        catch (e){
            console.log("could not find/parse auth cookie");
            await logout();

        }
    };

    useEffect(() => {
        loadCookie().then(() => {console.log("cookie loaded")});
    }, []);

    // login
    const login = async (username, password) => {
        if (loginError) setLoginError(false);

        setWaiting(true);
        try {
            await pb.collection('users').authWithPassword(
                username,
                password
            )
            if (!pb.authStore.model["verified"]) {
                navigator('/not-verified');
                return;
            }

            let expCookie = pb.authStore.exportToCookie({sameSite: 'none', secure: true}, COOKIE_KEY);
            cookies.set(COOKIE_KEY, expCookie, {sameSite:'none', secure: true})
        } catch(error) {
            setLoginError(error);
        } finally {
            setWaiting(false);
        }

        if (!pb.authStore.isValid) {
            setWaiting(false);
            setLoginError("auth not valid");
            return
        }
        setLoginValid(true);
        setWaiting(false);
        setLoginSuccess(true);
        navigator("/home");
    };

    // logout
    const logout = async () => {
        pb.authStore.clear()
        cookies.remove("auth", { path: '/' });
        setLoginValid(false);
        setWaiting(false);
        navigator("/login")
    };


    const getUserId = () => {
        return pb.authStore.model.id;
    };

    return(
        <AuthContext.Provider value={{login, logout, loginError, waiting, loginSuccess, getUserId, loginValid, loadCookie}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
};