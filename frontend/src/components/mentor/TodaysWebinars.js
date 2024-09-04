import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../helpers/axios'
import {Link} from 'react-router-dom'

function TodaysWebinars() {

    //get webinars
    const [webinars ,setWebinars] = useState([])
    useEffect(() => {
        axiosInstance.get(process.env.REACT_APP_WEBINAR_SVC_ENDPOINT + "/webinar/"+ "today")
        .then(resp => setWebinars(resp.data?.data?.todaysWebinars))
        .catch(err => console.error(err?.response?.data?.message))
    },[])

  return (
    <div>
        <div className='border-2 w-full h-96'>
            <div className="text-center text-gray-500 font-xl">Today's Webinars</div>
            {
                webinars?.length === 0 && <div className="text-center h-full text-5xl text-gray-400">No webinars scheduled today</div>
            }
            {
                webinars?.map( w => (
                    <Link to={"/mentor/webinar/"+w?._id} className="flex justify-evenly items-start shadow-xl p-2">
                        <img src={w?.banner} alt="banner" className='w-48 h-auto rounded-xl' />
                        <div className="">
                            <div className="text-gray-700 font-semibold">{w?.title}</div>
                            <div className="text-gray-700 font-extrabold">$ {w?.amount}</div>
                            <div className="text-gray-700">Participants: {w?.participants?.length}</div>
                        </div>
                        {/* <div className="text-gray-700 font-extralight">{moment(w?.date).format('MMMM Do, YYYY ◾ h:mm A')}</div> */}
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default TodaysWebinars