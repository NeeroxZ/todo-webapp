import {useState} from "react";
import {useAuth} from "../stores/AuthStore";
import pb from "../utils/pocketbase";
import {useUserStore} from "../stores/UserStore";

export const useChangeUser = () => {
    const [isLoadingChangePassword, setIsLoadingChangePassword] = useState(false);
    const [errorChangePassword, setErrorChangePassword] = useState(false);

    const [isLoadingChangeMail, setIsLoadingChangeMail] = useState(false);
    const [errorChangeMail, setErrorChangeMail] = useState(false);

    const [isLoadingChangeUsername, setIsLoadingChangeUsername] = useState(false);
    const [errorChangeUsername, setErrorChangeUsername] = useState(false);

    const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
    const [errorDashboard, setErrorDashboard] = useState(false);

    const auth = useAuth();
    const {settings, reloadSettings, isLoadingSettings} = useUserStore();

    const authNotValid = (setLoading, setError) => {
        setLoading(false);
        setError({"name": "auth error", "message": "not authenticated"});
    };

    const changePassword = async (old_pw, new_pw, new_confirm_pw) => {
        if (!auth.loginValid) {
            authNotValid(setIsLoadingChangePassword, setErrorChangePassword)
            return;
        }
        setIsLoadingChangePassword(true);
        setErrorChangePassword(false);
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
        setErrorChangeMail(false);
        if (!auth.loginValid) {
            authNotValid(setIsLoadingChangeMail, setErrorChangeMail);
            return;
        }
        try {
            await pb.collection('users').requestEmailChange(new_mail);
        } catch (e) {
            console.log("error changing mail: ", e);
            setErrorChangeMail(true);
        } finally {
            setIsLoadingChangeMail(false);
        }
    };

    const changeUsername = async (new_un) => {
        setErrorChangeUsername(false);
        setIsLoadingChangeUsername(true);
        if (!auth.loginValid) {
            authNotValid(setIsLoadingChangeUsername, setErrorChangeUsername)
            return;
        }
        let data = {"username": new_un}
        try {
            await pb.collection('users').update(auth.getUserId(), data);
        } catch (e) {
            console.log("error changing username: ", e);
            setErrorChangeUsername(true);
        } finally {
            setIsLoadingChangeUsername(false);
        }
    };

    const changeDashboardView = async (newItem) => {
        setErrorDashboard(false);
        setIsLoadingDashboard(true);
        if (!auth.loginValid) {
            authNotValid(setIsLoadingDashboard, setErrorDashboard);
            return;
        } else if (isLoadingSettings) {
            return;
        }

        let data = {"dashboardTwo": newItem};
        try {
            await pb.collection('user_settings').update(settings.id, data).then(reloadSettings);
        } catch (e) {
            console.log("error changing dashboard view: ", e.message);
            setErrorDashboard(true);
        } finally {
            setIsLoadingDashboard(false);
        }
    };

    return {
        changePassword, isLoadingChangePassword, errorChangePassword,
        changeMail, isLoadingChangeMail, errorChangeMail,
        changeUsername, isLoadingChangeUsername, errorChangeUsername,
        changeDashboardView, isLoadingDashboard, errorDashboard,
    }
};