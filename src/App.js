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
                                <Route index element={
                                    <ProtectedRoute>
                                        <Dashboard/>
                                    </ProtectedRoute>
                                }/>
                                <Route path="login" element={<Login/>}/>
                                <Route path="reset" element={<ResetPasswordPage/>}/>
                                <Route path="register" element={<Register/>}/>
                                <Route path="confirm" element={<ConfirmMailPage/>}/>
                                <Route path="dashboard" element={<Dashboard/>}/>
                                <Route path="user" element={<UserPage/>}/>
                                <Route path="about" element={<About/>}/>
                                <Route path="home" element={
                                    <ProtectedRoute>
                                        <Dashboard/>
                                    </ProtectedRoute>}/>
                                <Route path="todo">
                                    <Route path="all" element={
                                        <ProtectedRoute>
                                            <TodoPage scrollable={true}/>
                                        </ProtectedRoute>
                                    }/>
                                    <Route path="today" element={
                                        <ProtectedRoute>
                                            <TodoTodayPage/>
                                        </ProtectedRoute>
                                    }/>
                                    <Route path="tomorrow" element={
                                        <ProtectedRoute>
                                            <TodoTomorrowPage/>
                                        </ProtectedRoute>
                                    }/>
                                </Route>
                                <Route path="topic/:title" element={
                                    <ProtectedRoute>
                                        <TodoTopicPage/>
                                    </ProtectedRoute>
                                }/>

                                <Route path="*" element={<NoMatch/>}/>
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
