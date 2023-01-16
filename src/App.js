import React, {useState} from "react";
import './styles/Modal.module.css'
import GlobalStore from "./stores/GlobalStore";
import {
    BrowserRouter as Router,
    Routes,
    Route, NavLink,
} from "react-router-dom";
import {BlockPicker, CirclePicker, SketchPicker} from 'react-color';
import './App.css';
import {AuthProvider, useAuth} from "./stores/AuthStore";
import ProtectedRoute from "./utils/ProtectedRoute";
import pb from "./utils/pocketbase";
import {ConfirmMailPage} from "./pages/ConfirmMail";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import {UserStore, useUserStore} from "./stores/UserStore";
import {Box, Button, Input, TextField, Typography} from "@mui/material";
import Modal from './components/Modal.jsx';


function App() {
    return (
        <>
            <GlobalStore>
                <Router>
                    <AuthProvider>
                        <Navigation />
                        <Routes>
                            <Route index element={<Login />} />
                            <Route path="login" element={<Login />} />
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
                            <Route path="admin" element={<Admin />} />
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





const TodoPage = () => {
    const {} = useAuth();


    return (
        <div
            style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                height: "30rem",
                width: "20rem",
                backgroundColor: "darkblue",
                color: "white"
            }}
        >
            Hello, world!
        </div>
        // <>
        //     <h2>Dashboard (Protected)</h2>
        //
        //     <div>Authenticated as {token}</div>
        // </>
    );
};


const Home = () => {
    const {logout} = useAuth();
    const {getTopics, uploadTopic} = useUserStore();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)}>Open Me</button>
            {isOpen && <Modal setIsOpen={setIsOpen}/>}

        </>
    );
};

const Admin = () => {
    return (
        <>
            <h2>Admin (Protected)</h2>
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
