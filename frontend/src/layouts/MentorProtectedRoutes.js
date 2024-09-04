import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import MentorNavbar from '../components/mentor/MentorNavbar';

function MentorProtectedRoutes({user, role}) {
    return (
            <>
            {
                (user && role==="mentor") ? 
                (
                    <>
                        <MentorNavbar />
                        <div class="pt-16 sm:ml-64">
                            <Outlet />
                        </div>
                    </> 
                ) : <Navigate to={"/"} />
            }
            </>
    )
        
}

export default MentorProtectedRoutes;
