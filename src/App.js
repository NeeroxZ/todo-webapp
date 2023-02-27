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

// components
import {NavBar} from "./components/Navbar";
// import {UserProvider} from "./stores/UserStore";
import {TopicProvider} from "./stores/TopicStore";
import {AppRoutes} from "./AppRoutes";
import {UserProvider} from "./stores/UserStore";





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
