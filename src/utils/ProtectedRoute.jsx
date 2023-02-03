import React from 'react'
import {Navigate} from "react-router-dom"
import {useAuth} from "../stores/AuthStore";

export const ProtectedRoute = ({children}) => {
    const auth = useAuth();
    if (!auth.loginValid) {
        return <Navigate to="/login" replace/>;
    }
    return children
};

export default ProtectedRoute;