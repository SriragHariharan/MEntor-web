import React from 'react'
import why_us_banner from '../../assets/images/landingpage/why us banner.jpg'

function WhyUs() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
        <div>
            <img src={why_us_banner} alt="why us mentor mentee speaking" className='w-full' />
        </div>
        <div className="flex flex-col items-center justify-center">
            <div className="text-green-500 text-md md:text-2xl font-bold my-4">
                Why choose MEntor ??
            </div>
            <div className="text-dark text-2xl md:text-5xl font-semibold">
                Explore endless possibilities <br /> for growth and development
            </div>
            {/* features  */}
            <div className="flex justify-evenly mt-12 gap-12">
                <div className="flex flex-col items-center justify-center">
                    <i class="fa-solid fa-earth-americas text-5xl md:text-6xl text-green-500"></i>
                    <div className="text-xs md:text-sm text-gray-400 font-semibold">Worldwide mentors</div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <i class="fa-solid fa-lightbulb text-5xl md:text-6xl text-green-500"></i>
                    <div className="text-xs md:text-sm text-gray-400 font-semibold">World's best brains</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <i class="fa-solid fa-seedling text-5xl md:text-6xl text-green-500"></i>
                    <div className="text-xs md:text-sm text-gray-400 font-semibold">endless opportunities</div>
                </div>
            </div>

            <button type="button" class="text-white bg-green-500 hover:bg-green-600 font-medium rounded-full text-sm px-4 py-3 text-center me-2 mb-2 mt-12">
                  Contact Us &nbsp;&nbsp; <i class="fa-solid fa-arrow-right"></i>
              </button>
        </div>
    </div>
  )
}

export default WhyUs