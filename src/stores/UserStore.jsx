import React, {useState} from "react";

const initState = {
    darkMode: false,
    todos: null,
    topics: null,
    tags: null,
};

export const UserContext = React.createContext();

const GlobalStore = ({children}) => {
    const [state, setState] = useState(initState);

    return(
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    );
};

export default GlobalStore;