// styling
import './styles/index.css'
import {Theme} from "./theme/theme"

// general
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";

// utils, stores and providers
import {GlobalStore} from "./stores/GlobalStore";
import {ThemeProvider} from "@mui/material";
import {AuthProvider} from "./stores/AuthStore";
import {TopicProvider} from "./stores/TopicStore";
import {UserProvider} from "./stores/UserStore";

// components
import {NavBar} from "./components/navbar/Navbar";

import {AppRoutes} from "./AppRoutes";





function App() {
    return (
        <>
            <GlobalStore>
                <ThemeProvider theme={Theme}>
                    <Router>
                        <AuthProvider>
                            <UserProvider>
                                <TopicProvider>
                                    <NavBar/>
                                    <AppRoutes />
                                </TopicProvider>
                            </UserProvider>
                        </AuthProvider>
                    </Router>
                </ThemeProvider>
            </GlobalStore>
        </>
    );
}




const NoMatch = () => {
    return (
        <>
            <h2>Page not found</h2>
        </>
    )
}

export default App;
