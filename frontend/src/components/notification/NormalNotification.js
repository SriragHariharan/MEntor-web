import React from 'react'
import { FaHeart, FaLaptopCode, FaRegComment } from "react-icons/fa";
import moment from "moment"

function NormalNotification({ notification }) {
  return (
    <div class="w-full p-3 mt-1 bg-gray-200 flex flex-shrink-0">
        <div tabindex="0" aria-label="group icon" role="img" class="focus:outline-none w-10 h-10 border rounded-full border-gray-200 flex flex-shrink-0 items-center justify-center">
            <FaLaptopCode className='text-dark text-6xl' />
        </div>
        <div class="pl-3 w-full">
            <div class="flex flex-col items-start justify-between w-full">
                <small>{notification?.title}</small>
                <p>{notification?.message}</p>
            </div>
            <p tabindex="0" class="focus:outline-none text-xs leading-3 pt-1 text-gray-500">{moment(notification?.createdAt).fromNow(true)} ago</p>
        </div>
    </div>
  )
}

export default NormalNotification