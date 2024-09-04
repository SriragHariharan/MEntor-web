import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
 
 function WebinarCard({ mentor, details }) {

    return (
	    <Link to={mentor ? `/mentor/webinar/${details?._id}` : `/mentee/webinar/${details?._id}` } className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto bg-white dark:bg-gray-600 my-4">
            <div className="w-full md:w-1/3 grid place-items-center">
                <img src={details?.banner} alt="banner-webinar" className="rounded-xl h-full object-cover" />
            </div>
			<div className="w-full md:w-2/3 bg-white dark:bg-gray-600 flex flex-col space-y-2 p-3">
				<div className="flex justify-between item-center">
					<p className="text-gray-500 font-medium hidden md:block">{details?.topic}</p>
					<div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
						{moment(details?.date).format('MMMM Do, YYYY ◾ h:mm A')}
                    </div>
				</div>
				<div className="font-black text-gray-800 md:text-2xl text-md">{details?.title}</div>
				<p className="md:text-sm text-gray-500 text-xs">
					{details?.description?.slice(0,100)}......
				</p>
				<div className="flex justify-between item-center">
					<p className="text-gray-300 font-bold text-sm ml-1">
                        {details?.participants?.length} registered
                    </p>
					{
						details?.amount === 0 ?(
							<span className="text-green-500 font-extrabold">Free</span>
						):(
							<span className=" font-black text-gray-800">$ {details?.amount}</span>
						)
					}
				</div>
			</div>
		</Link>
    )
}

export default WebinarCard