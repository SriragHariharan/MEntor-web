import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../helpers/axios';
import { insertDataToIndexedDB, retrieveDataFromIndexdDB } from '../helpers/local-forage';

function useAllMentors() {
    //set mentors
	const[mentorsList, setMentorsList] = useState([]);
    const [error, setError] = useState(null);

	//fetch mentor list from server
	useEffect(() =>{
		if(!navigator.onLine){
			retrieveDataFromIndexdDB("mentors")
			.then(data => setMentorsList(data))
			.catch(error => setError("Unable to retrieve mentors"));
		}else{
			axiosInstance.get(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + "users/mentors")
			.then(resp => {
				setMentorsList(resp?.data?.data?.mentors);
				insertDataToIndexedDB("mentors", resp?.data?.data?.mentors)
			})
			.catch(err => setError(err.message))
		}
	},[])

  return {mentorsList, error}
}

export default useAllMentors