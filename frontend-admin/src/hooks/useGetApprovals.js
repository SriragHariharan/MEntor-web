//custom hook to fetch all admins from the server

import{ useEffect, useState } from 'react'
import useAxios from './useAxios';
import ENDPOINTS from '../configs/endpoints';

function useGetApprovals() {
    const [mentors, setMentors] = useState([]);
    const [error, setError] = useState(null);
    const axiosInstance = useAxios();

    useEffect(() =>{
        axiosInstance.get(ENDPOINTS.APPROVAL_PENDING_MENTORS)
        .then(resp => setMentors(resp?.data?.data?.mentors))
        .catch(err => setError(err.message));
    },[])

    return {mentors, error};
}

export default useGetApprovals