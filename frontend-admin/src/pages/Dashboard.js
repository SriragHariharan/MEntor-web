import React, { useState, useEffect } from 'react'
import TopCards from '../components/dashboard/TopCards'
import TodaysMeetings from '../components/dashboard/TodaysMeetings'
import TodayWebinars from '../components/dashboard/TodayWebinars'
import ENDPOINTS from '../configs/endpoints';
import useAxios from '../hooks/useAxios';

function Dashboard() {

    //webinars fetch
    const axiosInstance = useAxios();
    const[webinars, setWebinars] = useState(null);
    useEffect(() => {
        axiosInstance.get(ENDPOINTS.TODAYS_WEBINARS)
        .then(resp => setWebinars(resp?.data?.data))
        .catch(err => console.error(err));
    },[])
  return (
    <div className='mt-8'>
        <TopCards webinars={webinars} />
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 p-10">
            {/* <TodaysMeetings /> */}
            <TodayWebinars todaysWebinars={webinars?.todaysWebinars} />
        </div>
    </div>
  )
}

export default Dashboard