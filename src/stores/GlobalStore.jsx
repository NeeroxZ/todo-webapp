import React, {useContext, useEffect, useState} from "react";
import {useMediaQuery} from "@mui/material";

const GlobalContext = React.createContext(null);

export const GlobalStore = ({children}) => {
    const matches = useMediaQuery('(min-width:600px)');
    const [mobileView, setMobileView] = useState(matches);
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        if (!matches) {
            setMobileView(true);
        } else {
            setMobileView(false);
            setShowNav(false);
        }
    }, [matches]);

    const toggleNav = () => {
        if (!matches) {
            setShowNav(!showNav);
        }
    };


    return(
        <GlobalContext.Provider value={{mobileView, showNav, toggleNav}}>
            {children}
        </GlobalContext.Provider>
    );
};


export const useGlobalStore = () => {
    return useContext(GlobalContext);
};