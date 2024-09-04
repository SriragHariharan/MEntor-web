import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../helpers/axios';
import { useParams } from 'react-router-dom';
import { BsSmartwatch } from "react-icons/bs";
import SlotAvailableButton from './SlotAvailableButton';

function SlotsPage({profileDetails}) {
    const [date, setDate] = useState(new Date()?.toISOString().split('T')[0]);
	const[slots, setSlots] = useState([]);

	const {id} = useParams();
	console.log(id)
	//fetch slots of a specific date	
	useEffect(()=>{
		axiosInstance.post(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT +"/slots/mentor", {mentorID:id, date })
		.then(resp => setSlots(resp.data.data.slots))
		.catch(err => console.log(err))
	},[date])
	




  return (
		<div className="w-full">
			<div className="bg-white dark:bg-gray-900 rounded shadow-md p-4">
				<div className="grid grid-cols-1 lg:flex lg:justify-between lg:items-center">
					<div className="">
						<h2 className="text-lg font-bold dark:text-gray-400 ">
							Slots:
						</h2>
						<small className="mb-4 text-gray-400">
							** The slots have a validation of one hour
						</small>
					</div>
					<input
						value={date}
						onChange={(e) => setDate(e.target.value)}
						min={new Date().toISOString().split('T')[0]}
						datepicker
						type="date"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-48 ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="Select date"
					/>
				</div>
				{/* slots listing section */}
				<div className="mt-12 grid grid-cols-2 md:grid-cols-6 gap-4">
					{
						slots?.map(slot => 
							slot.isBooked ?
								(<button className="flex flex-row items-center justify-center bg-red-300 hover:bg-red-400 cursor-not-allowed rounded-lg py-2 px-4 mb-2">
									<BsSmartwatch className="text-2xl text-dark mr-2" />
									<div className="flex flex-col">
										<span className="text-sm text-dark">{slot?.time} IST</span>
										<span className="text-xs text-dark opacity-70">₹ {slot?.amount}</span>
									</div>
								</button>):(
								<SlotAvailableButton slot={slot} mentorID={profileDetails?.userID} mentor={profileDetails?.username} />
								)
						)
					}
					
				</div>
				{
					(slots?.length === 0) && <div className="text-center text-slate-400 dark:text-slate-700  text-2xl">No slots available on the selected date : (</div>
				}
                
			</div>
		</div>
  );
}

export default SlotsPage