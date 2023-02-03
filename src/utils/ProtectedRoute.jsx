import React from 'react'
import {Navigate, Route, RedirectFunction} from "react-router-dom"
import {useAuth} from "../stores/AuthStore";
import pb from "./pocketbase";
import {Backdrop, CircularProgress} from "@mui/material";
import '../styles/global.css';

export const ProtectedRoute = ({children}) => {
    const auth = useAuth();
    if (auth.waiting) {
        return (
            <>
                <div className={"circularContainer"}>
                    <Backdrop open={auth.waiting}>
                        <CircularProgress/>
                    </Backdrop>
                </div>
            </>
        );
    }
    if (!auth.loginValid) {
        return <Navigate to="/login" replace/>;
    }
    return children
};


export default ProtectedRoute;