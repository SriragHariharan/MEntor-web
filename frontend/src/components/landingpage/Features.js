import React from 'react'

function Features() {
  return (
    <div className='my-16'>
        <div className="text-center text-4xl md:text-5xl text-dark font-bold">
            Our Features
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 md:gap-12 pt-12 md:p-12">
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow text-center">
                <i class="fa-solid fa-microphone text-5xl text-green-500"></i>
                <h5 class="mb-2 text-2xl font-semibold text-gray-900">Audio Rooms</h5>
                <p class="mb-3 font-normal text-gray-500">Audio rooms for knowing what happens around the tech globe</p>
            </div>
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow text-center">
                <i class="fa-solid fa-video text-5xl text-green-500"></i>
                <h5 class="mb-2 text-2xl font-semibold text-gray-900">Mock Interviews</h5>
                <p class="mb-3 font-normal text-gray-500">Mock interviews and guidance for people who really want to grow in tech</p>
            </div>
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow text-center">
                <i class="fa-regular fa-comments text-5xl text-green-500"></i>
                <h5 class="mb-2 text-2xl font-semibold text-gray-900">Mentor chats</h5>
                <p class="mb-3 font-normal text-gray-500">Audio rooms for interacting with techies around the world and to know what happens around the globe</p>
            </div>
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow text-center">
                <i class="fa-solid fa-code text-5xl text-green-500"></i>
                <h5 class="mb-2 text-2xl font-semibold text-gray-900">Tech webinars</h5>
                <p class="mb-3 font-normal text-gray-500">Audio rooms for interacting with techies around the world and to know what happens around the globe</p>
            </div>

        </div>
    </div>
  )
}

export default Features