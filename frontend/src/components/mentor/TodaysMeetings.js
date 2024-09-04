import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../helpers/axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

function TodaysMeetings() {

    const[meetings, setMeetings] = useState([])
    useEffect(() => {
        axiosInstance.get(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + "/meetings/today")
        .then(resp => setMeetings(resp.data?.data?.todaysMeetings))
        .catch(err => console.log(err))
    },[])


  return (
    <div className='border-2 w-full h-96'>
        <div className="text-center text-gray-500">Today's Meetings</div>
        {
            meetings?.length === 0 && <div className="text-center text-gray-500 text-4xl">No meetings scheduled today</div>
        }
        {
            (meetings?.length > 0) && meetings?.map(m => 
                <div className='text-base text-center p-2 border-2'>
                    Meeting with {" "}
                    <Link className='text-blue-400' to={"/"+ m?.menteeID+"/profile/"}>Mentee</Link> 
                    {" "} on {moment(m?.date).format('h:mm A')}
                </div>
            )
        }
    </div>
  )
}

export default TodaysMeetings