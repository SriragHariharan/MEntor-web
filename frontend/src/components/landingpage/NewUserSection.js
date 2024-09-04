import React from 'react'
import mentor_main from '../../assets/images/landingpage/mentor_main.jpg'
import mentee_main from '../../assets/images/landingpage/mentee_main.jpg'
import { Link } from 'react-router-dom'

function NewUserSection() {
  return (
    <div className='grid grid-cols-2 bg-gray-100 px-4 py-10 md:py-16 gap-4 md:gap-8'>
        <Link to={"/auth/mentor"} className='bg-gray-100 cursor-pointer'>
            <img className='w-full rounded-3xl' src={mentor_main} alt="mentor speaking" />
            <div className="text-md md:text-3xl text-gray-600">Become a Mentor ??</div>
            <div className="text-sm md:text-xl text-gray-500">
                Sign up now &nbsp;&nbsp;
                <i class="fa-solid fa-chevron-right fa-xs"></i>
                <i class="fa-solid fa-chevron-right fa-xs"></i>
            </div>
        </Link>
        <Link to={"/auth/mentee"}  className='bg-gray-100 cursor-pointer'>
            <img className='w-full rounded-3xl' src={mentee_main} alt="mentee blue" />
            <div className="text-md md:text-3xl text-gray-600">Find a Mentor ??</div>
            <div className="text-sm md:text-xl text-gray-500">
                Register now &nbsp;&nbsp;
                <i class="fa-solid fa-chevron-right fa-xs"></i>
                <i class="fa-solid fa-chevron-right fa-xs"></i>
            </div>
        </Link>
    </div>
  )
}

export default NewUserSection