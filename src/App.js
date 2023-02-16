import './styles/index.css'



import React, {useState} from "react";
import GlobalStore from "./stores/GlobalStore";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {AuthProvider, useAuth} from "./stores/AuthStore";
import ProtectedRoute, {PrivateRoute} from "./utils/ProtectedRoute";
import {ConfirmMailPage} from "./pages/ConfirmMail";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {TodoPage} from "./pages/TodoPage";
import {ResetPasswordPage} from "./pages/ResetPasswordPage";
import {TodoTopicPage} from "./pages/TodoTopicPage";
import {TodoTodayPage} from "./pages/TodoTodayPage";
import {TodoTomorrowPage} from "./pages/TodoTomorrowPage";
import {Dashboard} from "./pages/Dashboard";
import {NavBar} from "./components/Navbar";
import {UserPage} from "./pages/UserPage";
import {createTheme, ThemeProvider} from "@mui/material";
import {About} from "./pages/About";


const theme = createTheme({
    palette:{
        mode: 'dark',
        primary: {
            main: "#04AA6D",
        },
    }
});

function App() {
    return (
        <>
            <GlobalStore>
                <ThemeProvider theme={theme}>
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
