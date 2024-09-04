import React, { useState } from 'react'
import moment from 'moment'
import WebinarPaypalButton from './WebinarPaypalButton';
import { Link } from 'react-router-dom';

function WebinarDetailsSection({ mentor, details, registered, setIsRegistered }) {
	const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
		setModalOpen(true);
    };

    const handleModalClose = () => {
    	setModalOpen(false);
    };
  return (
    <>
		<>
          <div className="text-5xl mb-8 text-gray-800 dark:text-slate-400 font-extrabold">
              {details?.title}
          </div>
          <div className="flex justify-between align-center my-2">
            <div className='flex justify-between gap-2'>
				{
					(details?.amount ===0) ? (
						<div className="bg-green-200 dark:bg-gray-600 dark:text-slate-300 rounded-3xl px-4 py-1.5">Free</div>
					):(
						<div className="bg-blue-200 dark:bg-gray-600 dark:text-slate-300 rounded-3xl px-4 py-1.5"> $ {details?.amount}</div>
					)
				}
                <div className="bg-green-50 dark:bg-gray-600 dark:text-slate-300 rounded-3xl px-4 py-1.5">{details?.topic}</div>
                <div className="bg-green-50 dark:bg-gray-600 dark:text-slate-300 rounded-3xl px-4 py-1.5">{details?.type}</div>
            </div>
            <div className='flex justify-between gap-2'>
                <div className="bg-green-50 dark:bg-gray-600 dark:text-slate-300 rounded-3xl px-4 py-1.5">
                    {details?.participants?.length} participants
				</div>
                <div className="bg-green-50 dark:bg-gray-600 dark:text-slate-300 rounded-3xl px-4 py-1.5">
                  	{moment(details?.date).format('MMMM Do, YYYY ◾ h:mm A')}
				</div>
            </div>
          </div>
		  {
			details?.banner && (
				<div>
					<img src={details?.banner} className='w-full h-96 object-cover' alt="webinar banner" />
				</div>
			)
		  }
          <p className="text-gray-700 dark:text-gray-300">
              	{details?.description}
          </p>
		  {
			
			(!registered && details?.amount ===0) &&  (
				<div className="text-center bg-blue-500 px-4 py-4 rounded-lg text-white mt-4 cursor-pointer">Register for free</div>
			)
		  }
		  {
			 !registered && details?.amount > 0 && (
				<div onClick={handleModalOpen} className="text-center bg-green-500 px-4 py-4 rounded-lg text-white mt-4 cursor-pointer">
					Register now <span className="font-bold">${details?.amount}</span>  only
				</div>
			 )
		  }
		  {
			 registered && (
				<Link to={ mentor ? "/mentor/interview/" + details?.link : "/mentee/interview/" + details?.link}>
					<div className="text-center bg-blue-500 px-4 py-4 rounded-lg text-white mt-4 w-full">
						Join @ <span className="text-2xl font-semibold">{moment(details?.date).format('MMMM Do, YYYY , h:mm A')}</span> 
					</div>
				</Link>
			 )
		  }
		</>

		{/* Modal */}
		<>
			{modalOpen && (
				<div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl font-bold mb-4">Book slot</h2>
							<div className=" text-left">
								<button className="px-2 py-1 bg-red-600 text-white rounded" onClick={handleModalClose}>
									X
								</button>
							</div>
						</div>
						<div>
							<div className="text-xl text-center mb-4 text-gray">Pay ${details?.amount} now</div>
							<WebinarPaypalButton title={details?.title} mentorID={details?.mentorID} amount={details?.amount} webinarID={details?._id} setIsRegistered={setIsRegistered} />
						</div>
					</div>
				</div>
			)}
		</>
    </>
  )
}

export default WebinarDetailsSection