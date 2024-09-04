import React from 'react'
import { DEFAULT_USER_IMG } from '../../helpers/CONSTANTS'
import { Link } from 'react-router-dom'

function ProfileCard({ details }) {
    return (
        <Link to={`/${details?.userID}/profile`}>
            <div class="p-5 border rounded text-center text-gray-500 max-w-sm">
                <img class="w-32 h-32 rounded-full mx-auto object-cover" src={details?.profilePic ?? DEFAULT_USER_IMG } alt="" />
                <div class="text-sm mt-5">
                    <div class="dark:text-white font-extrabold text-gray-900 hover:text-indigo-600 ">
                        {details?.username}
                    </div>
                    <p>{details?.bio}</p>
                </div>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-300">
                    {details?.jobDescription}
                </p>
            </div>
        </Link>
    )
}

export default ProfileCard