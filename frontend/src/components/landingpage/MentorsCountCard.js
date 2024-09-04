import React from 'react'

function MentorsCountCard() {
  return (
    <div className='flex justify-center text-center'>
        <div className="bg-blue-50 px-4 py-12 md:px-36 md:py-24 md:rounded-3xl">
            <div className="text-2xl md:text-5xl font-semibold">
                Have 40+ Mentors from 6+ countries
            </div>
            <div className="text-sm md:text-3xl font-semibold my-4 text-gray-600">
                To help you achieve and overcome the challenges you face.
            </div>
            <button type="button" class="text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                View all mentors &nbsp; &nbsp; <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    </div>
  )
}

export default MentorsCountCard