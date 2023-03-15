import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./pages/auth/LoginPage";
import {ResetPasswordPage} from "./pages/auth/ResetPasswordPage";
import {RegisterPage} from "./pages/auth/RegisterPage";
import {ConfirmMailPage} from "./pages/auth/VerifyMailPage";
import {SettingsPage} from "./pages/SettingsPage";
import {About} from "./pages/About";
import {Home} from "./pages/Home";
import {TodoAllPage} from "./pages/todo/TodoAllPage";
import {TodoTodayPage} from "./pages/todo/TodoTodayPage";
import {TodoTomorrowPage} from "./pages/todo/TodoTomorrowPage";
import {TodoTopicPage} from "./pages/todo/TodoTopicPage";
import React from "react";
import PrivateRoute from "./utils/PrivateRoute";
import {NoMatch} from "./pages/NoMatch";
import {TodoDuePage} from "./pages/todo/TodoDuePage";
import {TodoSavedPage} from "./pages/todo/TodoSavedPage";
import {TodoDonePage} from "./pages/todo/TodoDonePage";
import {TodoDeletedPage} from "./pages/todo/TodoDeletedPage";
import {NotVerifiedPage} from "./pages/auth/NotVerifiedPage";

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<NoMatch/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="reset" element={<ResetPasswordPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="verify" element={<ConfirmMailPage/>}/>
                <Route path="not-verified" element={<NotVerifiedPage/>}/>
                <Route path="settings" element={<SettingsPage/>}/>
                <Route path="about" element={<About/>}/>
                <Route element={<PrivateRoute/>}>
                    <Route path="*" element={<NoMatch/>}/>
                    <Route index element={<Home/>}/>
                    <Route path="home" element={<Home/>}/>
                    <Route path="todo">
                        <Route path="all" element={<TodoAllPage/>}/>
                        <Route path="today" element={<TodoTodayPage/>}/>
                        <Route path="tomorrow" element={<TodoTomorrowPage/>}/>
                        <Route path="due" element={<TodoDuePage/>} />
                        <Route path="saved" element={<TodoSavedPage/>} />
                        <Route path="done" element={<TodoDonePage/>} />
                        <Route path="deleted" element={<TodoDeletedPage/>} />
                    </Route>
                    <Route path="topic/:title" element={<TodoTopicPage/>}/>
                </Route>
            </Routes>
        </>);
};