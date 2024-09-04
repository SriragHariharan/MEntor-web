import React, { useEffect, useState } from 'react'
import SuccessNotification from '../components/notification/SuccessNotification'
import NormalNotification from '../components/notification/NormalNotification'
import { axiosInstance } from '../helpers/axios'
import { insertDataToIndexedDB, retrieveDataFromIndexdDB } from '../helpers/local-forage';

function Notifications() {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		if(!navigator.onLine){
			retrieveDataFromIndexdDB("notifications")
			.then(resp => setNotifications(resp) );
		}else{
			axiosInstance.get(process.env.REACT_APP_NOTIFICATION_SVC_ENDPOINT + '/notifications/all')
			.then(resp => {
				setNotifications(resp.data?.data?.notifications);
				insertDataToIndexedDB("notifications",resp.data?.data?.notifications);
			})
			.catch(err => console.log(err))
		}
	},[])

	console.log(notifications)

  return (
		<div className="md:px-48 py-10 dark:bg-gray-800 px-4">
			<div className="flex justify-between items-center mb-12">
				<div>
					<div className="text-3xl font-semibold dark:text-gray-500">
						Notifications
					</div>
					<div className="text-sm font-semibold text-gray-300 dark:text-gray-600 hidden lg:block">
						You've 3 unread notifications
					</div>
				</div>
				{/* <button
					type="button"
					class="text-dark bg-gray-400 font-medium rounded-lg text-xs px-4 py-2 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700"
				>
					Mark all as read
				</button> */}
			</div>
			{
				notifications?.map( n => <NormalNotification key={n?._id} notification={n} /> )
			}
			{/* <SuccessNotification /> */}
			

			<div class="flex items-center justiyf-between">
				<hr class="w-full" />
				<p tabindex="0" class="focus:outline-none text-md flex flex-shrink-0 leading-normal px-3 py-16 text-gray-400">Thats it for now : )</p>
				<hr class="w-full" />
			</div>
		</div>
  );
}

export default Notifications