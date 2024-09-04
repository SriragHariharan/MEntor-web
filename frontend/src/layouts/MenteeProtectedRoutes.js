import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/mentee/Navbar';

function MenteeProtectedRoutes({user, role}) {
    return (
            <>
            {
                (user && role==="mentee") ? 
                (
                    <>
                        <Navbar />
                        <div class="sm:ml-64 pt-16">
                            <Outlet />
                        </div>
                    </> 
                ) : <Navigate to={"/"} />
            }
            </>
    )
        
}

export default MenteeProtectedRoutes;
