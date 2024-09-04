import React from 'react'
import hero_img from '../../assets/images/landingpage/hero banner.jpeg'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <div className='grid lg:grid-cols-2 gap-2 items-center'>
      {/* contents section */}
        <div className="order-2 lg:order-1 px-4 md:px-8">
            <div className="text-green-500 font-semibold text-3xl md:text-6xl">
                Start your success story
            </div>
            <div className="text-dark font-semibold text-3xl md:text-6xl mt-2 md:mt-4">
                Find your mentor today !
            </div>
            <div className='text-gray-500 md:mt-6'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, facere nisi? Quisquam, natus sit incidunt ad error alias aliquam architecto ab! Esse asperiores eveniet fugiat in quas consectetur, quo neque.
            </div>
            <div className="flex mt-6 gap-4 md:gap-8">
              <Link to={"/auth/mentee"} type="button" class="text-white bg-green-500 hover:bg-green-600 font-medium rounded-full text-sm px-4 py-3 text-center me-2 mb-2">
                  Signup for Free &nbsp;&nbsp; <i class="fa-solid fa-arrow-right"></i>
              </Link>
              <button type="button" class="border-2 border-gray-700 text-dark hover:bg-gray-100 font-medium rounded-full text-sm px-4 py-3 text-center me-2 mb-2">
                  Know more &nbsp;&nbsp; <i class="fa-solid fa-arrow-right"></i>
              </button>
              
            </div>
        </div>
        {/* banner image */}
        <div className="order-1 lg:order-2">
            <img src={hero_img} alt="banner img" />
        </div>
    </div>
  )
}

export default HeroSection