import React, { useEffect, useState } from 'react'
import MenteeTopcard from './MenteeTopcard'
import MarksChart from './MarksChart'
import { axiosInstance } from '../../helpers/axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

function MenteeDashboard() {

    const[meetings, setMeetings] = useState([])
    useEffect(() => {
        axiosInstance.get(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + "/meetings/today")
        .then(resp => setMeetings(resp.data?.data?.todaysMeetings))
        .catch(err => console.log(err))
    },[])
  return (
    <div className='dark:bg-gray-800'>
        <MenteeTopcard />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 py-24 mx-6">
            <div className="w-full xl:col-span-2">
                <MarksChart />
            </div>
            <div className="xl:col-span-1 p-8 border-2 border-green-100 rounded-md h-96 overflow-y-auto dark:text-gray-200">
                <div className="text-center underline mb-6">Today's meetings({ meetings?.length})</div>
                {meetings?.length === 0 && <h1 className="text-center text-lg">No meetings scheduled today...</h1> }    
                {
                    meetings?.map( m => 
                        <div className="bg-gray-100 py-3 my-2 text-center">
                            <Link to={"/" + m?.mentorID + "/profile"} className="fa-user fa-solid text-blue-500 text-xl mr-4"></Link>
                            Meeting on {moment(m?.date).format('MMMM Do, YYYY ◾ h:mm A')} 
                        </div> )
                }
            </div>
        </div>
    </div>
  )
}

export default MenteeDashboard