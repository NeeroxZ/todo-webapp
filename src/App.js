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
import {UserStore, useUserStore} from "./stores/UserStore";
import Modal from './components/Modal.jsx';
import {TodoPage} from "./pages/TodoPage";
import {ResetPasswordPage} from "./pages/ResetPasswordPage";
import {Button} from "@mui/material";
import {NavigationBar} from "./components/Navbar";
import {TopicPage} from "./pages/TopicPage";


function App() {
    return (
        <>
            <GlobalStore>
                <Router>
                    <AuthProvider>
                        <Navigation />
                        {/*<NavigationBar />*/}
                        <Routes>
                            <Route index element={<Login />} />
                            <Route path="login" element={<Login />} />
                            <Route path="reset" element={<ResetPasswordPage />}/>
                            <Route path="register" element={<Register />} />
                            <Route path="confirm" element={<ConfirmMailPage />}>

                            </Route>
                            <Route path="home" element={
                                <ProtectedRoute>
                                    <UserStore>
                                        <Home />
                                    </UserStore>
                                </ProtectedRoute>} />
                            <Route path="todo" element={
                                <ProtectedRoute>
                                    <TodoPage />
                                </ProtectedRoute>
                            } />
                            <Route path="topic/:id" element={
                                <ProtectedRoute>
                                    <TopicPage />
                                </ProtectedRoute>
                            } />
                            <Route path="*" element={<NoMatch />} />
                        </Routes>
                    </AuthProvider>
                </Router>

            </GlobalStore>
        </>
    );
}

const Navigation = () => {
    const {token, logout} = useAuth();

    const [title, setTitle] = useState(null);


    if (!pb.authStore.isValid) {
        return;
    }

    return(
        <nav>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/todo">Todos</NavLink>
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
    const {getTopics, uploadTopic} = useUserStore();
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
