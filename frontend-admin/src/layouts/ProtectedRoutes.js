import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../components/Header'

function ProtectedRoutes({adminAuthenticated}) {
  return (
    <>
    {
        adminAuthenticated ? (
            <>
                <Header />
                <div class="pt-16 sm:ml-64">
                    <Outlet />
                </div>
            </>
        ): <Navigate to={"/login"} />
    }
    </>
  )
}

export default ProtectedRoutes