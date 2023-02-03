import React, {useState} from "react";
import './styles/Modal.module.css'
import GlobalStore from "./stores/GlobalStore";
import {
    BrowserRouter as Router,
    Routes,
    Route, NavLink,
} from "react-router-dom";
import './App.css';
import {AuthProvider, useAuth} from "./stores/AuthStore";
import ProtectedRoute from "./utils/ProtectedRoute";
import pb from "./utils/pocketbase";
import {ConfirmMailPage} from "./pages/ConfirmMail";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {UserStore} from "./stores/UserStore";
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
import {Test} from "./pages/Test";



function App() {
    return (
        <>
            <GlobalStore>
                <Router>
                    <AuthProvider>

                        <Routes>
                            <Route path={"/"} element={<NavBar />}>
                                <Route index element={<Login />} />
                                <Route path="login" element={<Login />} />
                                <Route path="reset" element={<ResetPasswordPage />}/>
                                <Route path="register" element={<Register />} />
                                <Route path="confirm" element={<ConfirmMailPage />} />
                                <Route path="test" element={<Test />} />
                                <Route path="dashboard" element={<Dashboard />} />
                                <Route path="home" element={
                                    <ProtectedRoute>
                                        <UserStore>
                                            <Home />
                                        </UserStore>
                                    </ProtectedRoute>} />
                                <Route path="todo">
                                    <Route path="all" element={
                                        <ProtectedRoute>
                                            <TodoPage />
                                        </ProtectedRoute>
                                    }/>
                                    <Route path="today" element={
                                        <ProtectedRoute>
                                            <TodoTodayPage />
                                        </ProtectedRoute>
                                    }/>
                                    <Route path="tomorrow" element={
                                        <ProtectedRoute>
                                            <TodoTomorrowPage />
                                        </ProtectedRoute>
                                    }/>
                                </Route>
                                <Route path="topic/:title" element={
                                    <ProtectedRoute>
                                        <TodoTopicPage />
                                    </ProtectedRoute>
                                } />

                                <Route path="*" element={<NoMatch />} />
                            </Route>
                        </Routes>
                    </AuthProvider>
                </Router>

            </GlobalStore>
        </>
    );
}

const Navigation = () => {
    const {token, logout} = useAuth();



    if (!pb.authStore.isValid) {
        return;
    }

    return(
        <nav style={{display: "flex", justifyContent: "flex-start"}}>
            <NavLink to="/home">Home</NavLink>
            <div style={{marginLeft: "1rem"}}/>
            <NavLink to="/todo">Todos</NavLink>
            <div style={{marginLeft: "1rem"}}/>
            <NavLink to="/test">Nav</NavLink>
            <div style={{marginLeft: "1rem"}}/>
            <NavLink to="/todo/all">ALL</NavLink>
            <div style={{marginLeft: "1rem"}}/>
            <NavLink to="/todo/today">TODAY</NavLink>
            <div style={{marginLeft: "1rem"}}/>
            <NavLink to="/todo/tomorrow">Tomorrow</NavLink>
            <div style={{marginLeft: "1rem"}}/>
            <NavLink to="/topic/auto">Topic: Auto</NavLink>
            {token && (
                <button type="button" onClick={logout}>
                    Sign Out
                </button>
            )}
        </nav>
    );
}





const Home = () => {
    const {logout} = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Open Me</button>
            {isOpen && <Modal setIsOpen={setIsOpen}/>}
            <Button variant={"contained"} onClick={() => logout()}>Log out</Button>

        </>
    );
};







const NoMatch = () => {
    return (
        <>
            <h2>Page not found</h2>
        </>
    )
}

export default App;
