import React from 'react'
import { Link } from 'react-router-dom'

function MentorApprovalPage() {
  return (
    <div class="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-green-50 to-green-200">
        <div class="text-center">
            <h2 class="text-3xl font-bold mb-2">Hi <span class="text-blue-600">User</span> 👋</h2>
            <h1 class="text-4xl font-bold mb-4">Approval Pending</h1>
            <p class="text-xl mb-8">
              We'll review your application within 7 business days.
              <br /> Once approved, you'll receive an email and can start mentoring!
            </p>
            <p class="text-gray-600 text-2xl mb-12">Wishing you a fantastic mentoring journey! 😊</p>
            <Link to="/" class="bg-black text-white py-2 px-4 rounded hover:text-black hover:bg-white">Return to Home</Link>
        </div>
    </div>
  )
}

export default MentorApprovalPage