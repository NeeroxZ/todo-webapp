import {Route, Routes} from "react-router-dom";
import {Login} from "./pages/Login";
import {ResetPasswordPage} from "./pages/ResetPasswordPage";
import {Register} from "./pages/Register";
import {ConfirmMailPage} from "./pages/ConfirmMail";
import {UserPage} from "./pages/UserPage";
import {About} from "./pages/About";
import {Dashboard} from "./pages/Dashboard";
import {TodoAllPage} from "./pages/TodoAllPage";
import {TodoTodayPage} from "./pages/TodoTodayPage";
import {TodoTomorrowPage} from "./pages/TodoTomorrowPage";
import {TodoTopicPage} from "./pages/TodoTopicPage";
import React from "react";
import PrivateRoute from "./utils/PrivateRoute";

function NoMatch() {
    return null;
}

export const AppRoutes = () => {
    return (
        <>
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
                    <Route index element={<Dashboard/>}/>
                    <Route path="home" element={<Dashboard/>}/>
                    <Route path="todo">
                        <Route path="all" element={<TodoAllPage/>}/>
                        <Route path="today" element={<TodoTodayPage/>}/>
                        <Route path="tomorrow" element={<TodoTomorrowPage/>}/>
                    </Route>
                    <Route path="topic/:title" element={<TodoTopicPage/>}/>
                </Route>
            </Routes>
        </>);
};