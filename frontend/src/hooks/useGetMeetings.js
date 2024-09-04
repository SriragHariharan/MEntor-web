import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../helpers/axios';
import { retrieveDataFromIndexdDB } from '../helpers/local-forage';

function useGetMeetings() {
    const [meetings, setMeetings] = useState([]);
    const [error, setError] = useState([]);
    const [role, setRole] = useState(null);
    
    useEffect(() =>{
        if(!navigator.onLine){
            retrieveDataFromIndexdDB("meetings")
            .then(resp => setMeetings(resp))
            .catch(err => setError("Unable to retrieve"))
        }else{
            axiosInstance.get(process.env.REACT_APP_INTERVIEW_SVC_ENDPOINT + "/meetings")
            .then(resp => {
                setMeetings(resp.data?.data?.meetings);
                setRole(resp.data?.data?.role)
            })
            .catch(err => setError(err.message))
        }
    },[])


  return {meetings, error, role}
}

export default useGetMeetings