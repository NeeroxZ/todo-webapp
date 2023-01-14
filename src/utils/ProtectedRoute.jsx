import React from 'react'
import {Navigate} from "react-router-dom"
import pb from "./pocketbase";

export const ProtectedRoute = ({children}) => {
    if (!pb.authStore.isValid) {
        return <Navigate to="/login" replace/>;
    }
    return children
};

export default ProtectedRoute;