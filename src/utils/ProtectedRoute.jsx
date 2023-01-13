import React from 'react'
import {Navigate} from "react-router-dom"
import {useAuth} from "../stores/AuthStore";

const ProtectedRoute = ({children}) => {
    let {token} = useAuth();

    if (token === null) {
        return <Navigate to="/login" replace/>;
    }
    return children

};

export default ProtectedRoute;