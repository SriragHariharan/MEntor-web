import React, { useEffect } from 'react'
import FollowersCard from '../components/mentor/FollowersCard'
import { axiosInstance } from '../helpers/axios'
import useGetFollowers from '../hooks/useGetFollowers'

function Followers() {

  const {followers, error} = useGetFollowers();

  return (
    <div className='dark:bg-gray-800 py-12'>
        {/* interviews header */}
        <div className="lg:w-2/3 mx-auto w-full dark:bg-gray-800">
            <div className="text-3xl font-semibold dark:text-gray-500">
                Mentees:
            </div>
            <div className="text-sm font-semibold text-gray-300 dark:text-gray-600 hidden lg:block">
                Here you will get the details of all the mentees following you
            </div>
            {
              followers?.map(f => <FollowersCard key={f?.userID} follower={f} /> )
            }
        </div>
    </div>
  )
}

export default Followers