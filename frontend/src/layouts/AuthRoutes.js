import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AuthRoutes({user, role}) {
    return !user ? <Outlet /> : <Navigate to={`/${role}/profile`} />  
}

export default AuthRoutes
