import React from 'react'
import ProfileCard from '../components/webinars/ProfileCard'
import WebinarDetailsSection from '../components/webinars/WebinarDetailsSection'
import useWebinarDetalis from '../hooks/useWebinarDetalis'

function WebinarDetails({ mentor }) {
  
  const {webinarDetails, isRegistered, mentorDetails, error} = useWebinarDetalis();
  
  return (
    <div className="grid grid-cols-4 gap-4 py-12 dark:bg-gray-800">
        <div className="col-span-4 md:col-span-3">
            <WebinarDetailsSection mentor={mentor} details={webinarDetails} registered={isRegistered} />
        </div>
        <div className="col-span-4 md:col-span-1 md:me-2">
            <ProfileCard mentor={mentor} details={mentorDetails} />
        </div>
    </div>
  )
}

export default WebinarDetails