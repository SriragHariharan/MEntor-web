import React, { useContext } from 'react'
import {
    createRoutesFromElements,
    createBrowserRouter,
    Route,
    Navigate,
} from "react-router-dom";
import RootLayout from '../layouts/RootLayout';
import Login from '../components/Login';
import ProtectedRoutes from '../layouts/ProtectedRoutes';
import Mentors from '../pages/Mentors';
import Mentees from '../pages/Mentees';
import Transactions from '../components/Transactions';
import Approvals from '../pages/Approvals';
import { SignupContext } from '../contexts/userContext';
import Dashboard from '../pages/Dashboard';


function useRoutes() {
    const { isSignedUp } = useContext(SignupContext);


    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<RootLayout/>}>
                    <Route path="/" element={<ProtectedRoutes adminAuthenticated={isSignedUp} />}>
                        <Route index element={ <Dashboard /> } />                    
                        <Route path="/mentors" element={ <Mentors /> } />                    
                        <Route path="/mentees" element={ <Mentees /> } />
                        <Route path="/transactions/" element={ <Transactions /> } />
                        <Route path="/approvals" element={ <Approvals /> } />
                    </Route>
                    <Route path="login" element={!isSignedUp ? <Login /> : <Navigate to={"/"} /> } />
                </Route>
            </>
        )
    );
    return router;
}

export default useRoutes