import {useAuth} from "../stores/AuthStore";
import {Backdrop, CircularProgress} from "@mui/material";
import {Navigate, Outlet} from "react-router-dom";
import React from "react";

export const PrivateRoute = () => {
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

    return (
        auth.loginValid ? <Outlet /> : <Navigate to={"/login"} />
    );
};

export default PrivateRoute;