import {useState} from "react";
import {useAuth} from "../stores/AuthStore";
import {useAsyncError} from "react-router-dom";
import pb from "../utils/pocketbase";

export const useChangeUser = () => {
    const [isLoadingChangePassword, setIsLoadingChangePassword] = useState(false);
    const [errorChangePassword, setErrorChangePassword] = useState(false);

    const [isLoadingChangeMail, setIsLoadingChangeMail] = useState(false);
    const [errorChangeMail, setErrorChangeMail] = useState(null);

    const [isLoadingChangeUsername, setIsLoadingChangeUsername] = useState(false);
    const [errorChangeUsername, setErrorChangeUsername] = useState(null);

    const auth = useAuth();

    const authNotValid = (setLoading, setError) => {
        setLoading(false);
        setError({"name": "auth error", "message": "not authenticated"});
    };

    const changePassword = async (old_pw, new_pw, new_confirm_pw) => {
        setIsLoadingChangePassword(true);
        setErrorChangePassword(null);
        if (!auth.loginValid) {
            authNotValid(setIsLoadingChangePassword, setErrorChangePassword)
            return;
        }
        let data = {
            "oldPassword": old_pw,
            "password": new_pw,
            "passwordConfirm": new_confirm_pw,
        }
        try {
            await pb.collection('users').update(auth.getUserId(), data);
        } catch (e) {
            console.log("error changing password: ", e);
            setErrorChangePassword(true);
        } finally {
            setIsLoadingChangePassword(false);
        }

    };

    const changeMail = async (new_mail) => {
        setIsLoadingChangeMail(true);
        setErrorChangeMail(null);
        if (!auth.loginValid) {
            authNotValid(setIsLoadingChangeMail, setErrorChangeMail);
            return;
        }
        try {
            await pb.collection('users').requestEmailChange(new_mail);
        } catch (e) {
            console.log("error changing mail: ", e);
            setErrorChangeMail(e);
        } finally {
            setIsLoadingChangeMail(false);
        }
    };

    const changeUsername = async (new_un) => {
        setIsLoadingChangeUsername(true);
        setErrorChangeUsername(false);
        if (!auth.loginValid) {
            authNotValid(setIsLoadingChangeUsername, setErrorChangeUsername)
            return;
        }
        let data = {"username": new_un}
        try {
            await pb.collection('users').update(auth.getUserId(), data);
        } catch (e) {
            console.log("error changing username: ", e);
            setErrorChangeUsername(e);
        } finally {
            setIsLoadingChangeUsername(false);
        }
    };

    return {
        changePassword, isLoadingChangePassword, errorChangePassword,
        changeMail, isLoadingChangeMail, errorChangeMail,
        changeUsername, isLoadingChangeUsername, errorChangeUsername
    }
};