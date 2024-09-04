import React from 'react'
import { Link } from 'react-router-dom'

function UserBlocked() {
  return (
    <div class="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-red-50 to-red-100">
        <div class="text-center">
            <h2 class="text-3xl font-bold mb-2">Blocked by Admin 👮</h2>
            <h1 class="text-4xl font-bold mb-4">Your Account Has Been Blocked</h1>
            <p class="text-xl mb-8">
            Unfortunately, your account has been blocked by our admin team.
            <br /> Please contact us at <a href="mailto:admin@example.com">admin@example.com</a> to resolve this issue.
            </p>
            <i class="fas fa-lock text-4xl text-red-600 mb-12"></i>
            <p class="text-gray-600 text-2xl mb-12">We apologize for the inconvenience.</p>
            <Link to="/" class="bg-black text-white py-2 px-4 rounded hover:text-black hover:bg-white">Go home</Link>
        </div>
    </div>
  )
}

export default UserBlocked