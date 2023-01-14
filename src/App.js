import React from "react";
import GlobalStore from "./stores/GlobalStore";
import {
    BrowserRouter as Router,
    Routes,
    Route, NavLink,
} from "react-router-dom";
import './App.css';
import {AuthProvider, useAuth} from "./stores/AuthStore";
import {Login} from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import {Register} from "./pages/Register";
import pb from "./utils/pocketbase";
import {ConfirmMailPage} from "./pages/ConfirmMail";


function App() {
    return (
        <>
            <GlobalStore>
                <Router>
                    <AuthProvider>
                        <Navigation />
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route path="confirmMail" element={<ConfirmMailPage />}>

                            </Route>
                            <Route path="home" element={
                                <ProtectedRoute>
                                    <Home />
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
    return (
        <>
            <h2>Home (Public)</h2>


            <button type="button" onClick={() => logout()}>
                Sign Out
            </button>
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
