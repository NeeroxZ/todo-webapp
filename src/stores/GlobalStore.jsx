import React, {useState} from "react";

const initState = {
    sessionId: null
};

export const GlobalContext = React.createContext();

const GlobalStore = ({children}) => {
    const [state, setState] = useState(initState);

    return(
        <GlobalContext.Provider value={[state, setState]}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalStore;