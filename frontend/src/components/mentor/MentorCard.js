import React, { useState } from 'react'
import { DEFAULT_COVER_IMG, DEFAULT_USER_IMG } from '../../helpers/CONSTANTS'
import { Link } from 'react-router-dom';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { SlUserFollow } from "react-icons/sl";
import { axiosInstance } from '../../helpers/axios';
import { useSelector } from 'react-redux';


function MentorCard({details}) {
    //get loggedin user id 
    const myID = useSelector(store => store?.profile?.user?.userID);

    const [isFollowing, setIsFollowing] = useState(details?.followers.includes(myID));

    
    const {userID, username, jobDescription, profilePic, coverPic, followers, careerGuidanceCount, interviewsCount} = details;
    console.log("if ::: ",followers, myID, followers.includes(myID))

    //follow a mentor
    const handleFollow = () => {
        axiosInstance.post(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + "/users/follow", {mentorID: userID})
        .then(resp => setIsFollowing(true))
        .catch(err => console.log(err.message))
    }

    return (
        <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto my-8 bg-white dark:bg-gray-900 shadow-xl rounded-lg hover:shadow-3xl hover:shadow-gray-500">
            <div className="rounded-t-lg h-32 overflow-hidden">
                <img className=" object-cover w-full" src={coverPic?.secure_url ?? DEFAULT_COVER_IMG} alt={`${username} coverpic`} />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <img className="object-cover object-center h-32" src={profilePic?.secure_url ?? DEFAULT_USER_IMG} alt={`${username} profilepic`} />
            </div>
            <div className="text-center mt-2">
                <Link to={"/" + userID + "/profile"} className="h2 font-semibold dark:text-slate-300">{username}</Link>
                <p className="text-gray-500">{jobDescription ? jobDescription : null}</p>
            </div>
            <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                <li className="flex flex-col items-center justify-around">
                    <svg className="w-4 fill-current text-blue-900 dark:text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path
                            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <div className='dark:text-blue-300'>{followers?.length}</div>
                </li>
                <li className="flex flex-col items-center justify-between">
                    <svg className="w-4 fill-current text-blue-900 dark:text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path
                            d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                    </svg>
                    <div  className='dark:text-blue-300'>{interviewsCount}</div>
                </li>
                <li className="flex flex-col items-center justify-around">
                    <svg className="w-4 fill-current text-blue-900 dark:text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path
                            d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                    </svg>
                    <div className='dark:text-blue-300'>{careerGuidanceCount}</div>
                </li>
            </ul>
				<div className="p-4 border-t mx-8 mt-2">
                    {
                        isFollowing ? <small className='block mx-auto text-center text-gray-400'>You are following</small>
                        : <button onClick={handleFollow} className=" block mx-auto rounded-full bg-gray-900 dark:bg-gray-600 hover:shadow-lg font-semibold text-white px-6 py-2"><SlUserFollow /></button> 
                    }
					
				</div>
        </div>
  )
}

export default MentorCard
