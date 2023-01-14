import {useState, createContext, useContext} from "react";

const TodoContext = createContext(null);

export const TodoDataProvider = ({children}) => {
    const [id, setId] = useState(null);

    return(
        <TodoContext.Provider value={{id}}>
            {children}
        </TodoContext.Provider>
    )
};

export const useTodoData = () => {
    return useContext(TodoContext);
};