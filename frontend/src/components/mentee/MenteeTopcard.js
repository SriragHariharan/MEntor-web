import React, { useState, useEffect } from 'react'
import useGetMeetings from '../../hooks/useGetMeetings';
import { axiosInstance } from '../../helpers/axios';
import { showErrorToast } from '../../helpers/ToastMessageHelpers';

function MenteeTopcard() {
    const {meetings} = useGetMeetings();
    const [webinars, setWebinars] = useState(null);
    const [averageMarks, setAverageMarks] = useState(0);
//"/meetings/marks"
    //get webinars
    useEffect(() => {
        axiosInstance.get(process.env.REACT_APP_WEBINAR_SVC_ENDPOINT + "/webinar/"+ "mine")
        .then(resp => setWebinars(resp.data?.data?.webinars))
        .catch(err => showErrorToast(err?.response?.data?.message))
    },[])

    //get average marks
    useEffect(() => {
        axiosInstance.get(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + "/meetings/marks")
        .then(resp => {
            console.log(resp?.data?.data?.marks);
            let total = resp.data?.data?.marks?.reduce((accu, curr) => {
                return accu = accu + curr.marks
            }, 0)
            let avg = total/resp?.data?.data?.marks?.length;
            setAverageMarks(avg)
        })
        .catch(error => console.error(error.message))
    }, [])

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 pt-12 gap-4'>
        <div className="px-6 py-2 text-center border-2 mx-4 border-green-300">
            <div className="dark:text-white text-6xl font-extrabold">{webinars?.length}</div>
            <div className="text-regular text-slate-500">Total Webinars attended</div>
        </div>
        <div className="px-6 py-2 text-center border-2 mx-4 border-green-300">
            <div className="dark:text-white text-6xl font-extrabold">{meetings?.length}</div>
            <div className="text-regular text-slate-500">Total Interviews attended</div>
        </div>
        <div className="px-6 py-2 text-center border-2 mx-4 border-green-300">
            <div className="dark:text-white text-6xl font-extrabold">{Math.round(averageMarks ?? 0)}</div>
            <div className="text-regular text-slate-500">Average marks</div>
        </div>
    </div>
  )
}

export default MenteeTopcard