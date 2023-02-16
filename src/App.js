// styling
import './styles/index.css'
import {Theme} from "./theme/theme"

// general
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// utils, stores and providers
import GlobalStore from "./stores/GlobalStore";
import {PrivateRoute} from "./utils/PrivateRoute";
import {ThemeProvider} from "@mui/material";
import {AuthProvider} from "./stores/AuthStore";

// pages
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {ConfirmMailPage} from "./pages/ConfirmMail";
import {ResetPasswordPage} from "./pages/ResetPasswordPage";
import {Dashboard} from "./pages/Dashboard";
import {TodoPage} from "./pages/TodoPage";
import {TodoTodayPage} from "./pages/TodoTodayPage";
import {TodoTomorrowPage} from "./pages/TodoTomorrowPage";
import {TodoTopicPage} from "./pages/TodoTopicPage";
import {UserPage} from "./pages/UserPage";

// components
import {NavBar} from "./components/Navbar";
import {About} from "./pages/About";





function App() {
    return (
        <>
            <GlobalStore>
                <ThemeProvider theme={Theme}>
                    <Router>
                        <AuthProvider>
                            <NavBar/>
                            <Routes>
                                <Route path="*" element={<NoMatch/>}/>
                                <Route path="login" element={<Login/>}/>
                                <Route path="reset" element={<ResetPasswordPage/>}/>
                                <Route path="register" element={<Register/>}/>
                                <Route path="confirm" element={<ConfirmMailPage/>}/>
                                <Route path="user" element={<UserPage/>}/>
                                <Route path="about" element={<About/>}/>
                                <Route element={<PrivateRoute/>}>
                                    <Route path="*" element={<NoMatch/>}/>
                                    <Route index element={<Dashboard />} />
                                    <Route path="home" element={<Dashboard/>}/>
                                    <Route path="todo">
                                        <Route path="all" element={<TodoPage scrollable={true}/>}/>
                                        <Route path="today" element={<TodoTodayPage/>}/>
                                        <Route path="tomorrow" element={<TodoTomorrowPage/>}/>
                                    </Route>
                                    <Route path="topic/:title" element={<TodoTopicPage/>}/>
                                </Route>
                            </Routes>
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
