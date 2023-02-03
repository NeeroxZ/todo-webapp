import React, {useState} from "react";
import './styles/Modal.module.css'
import GlobalStore from "./stores/GlobalStore";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import './App.css';
import {AuthProvider, useAuth} from "./stores/AuthStore";
import ProtectedRoute, {PrivateRoute} from "./utils/ProtectedRoute";
import {ConfirmMailPage} from "./pages/ConfirmMail";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import Modal from './components/Modal.jsx';
import {TodoPage} from "./pages/TodoPage";
import {ResetPasswordPage} from "./pages/ResetPasswordPage";
import {Button} from "@mui/material";
import {TodoTopicPage} from "./pages/TodoTopicPage";
import {TodoTodayPage} from "./pages/TodoTodayPage";
import {TodoTomorrowPage} from "./pages/TodoTomorrowPage";
import {NavigationBar} from "./components/NavigationBar";
import {Dashboard} from "./pages/Dashboard";
import {NavBar} from "./components/Navbar";



function App() {
    return (
        <>

            <GlobalStore>
                <Router>
                    <AuthProvider>
                        <NavBar/>
                        <Routes>
                            <Route index element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }/>
                            <Route path="login" element={<Login/>}/>
                            <Route path="reset" element={<ResetPasswordPage/>}/>
                            <Route path="register" element={<Register/>}/>
                            <Route path="confirm" element={<ConfirmMailPage/>}/>
                            <Route path="test" element={<NavigationBar/>}/>
                            <Route path="dashboard" element={<Dashboard/>}/>
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
            </GlobalStore>
        </>
    )
}




const NoMatch = () => {
    return (
        <>
            <h2>Page not found</h2>
        </>
    )
}

export default App;
