import {createContext, useContext} from "react";

const UserContext = createContext(null);
export const UserProvider = ({children}) => {

    return(
        <UserContext.Provider value={{}}>
            {children}
        </UserContext.Provider>
    )
};

export const useUser = () => {
    return useContext(UserContext);
};