import {useContext, useState} from "react";

const UserContext = useContext(null);

export const UserProvider = ({children}) => {
    const [count, setCount] = useState({
        allCount: 0,
        todayCount: 0,
        tomorrowCount: 0,
        doneCount: 0,
        dueCount: 0,
    });
    const [countWait, setCountWait] = useState(true);
    const [countErr, setCountErr] = useState(false);

    const [settings, setSettings] = useState({});
    const [settingsWait, setSettingsWait] = useState(true);
    const [settingsErr, setSettingsErr] = useState(false);

    return (
        <UserContext.Provider value={{count, countWait, countErr, settings, settingsWait, settingsErr}}>
            {children}
        </UserContext.Provider>
    );
};