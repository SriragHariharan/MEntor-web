//custom hook to fetch all mentees(students) from the server

import{ useEffect, useState } from 'react'
import useAxios from './useAxios';
import ENDPOINTS from '../configs/endpoints';

function useGetMentees() {
    const [mentees, setMentees] = useState([]);
    const [error, setError] = useState(null);
    const axiosInstance = useAxios();

    useEffect(() =>{
        axiosInstance.get(ENDPOINTS.APPROVED_MENTEES)
        .then(resp => setMentees(resp?.data?.data?.mentees))
        .catch(err => setError(err.message));
    },[])

    return {mentees, error};
}

export default useGetMentees