import React from 'react'
import { RiCheckDoubleFill } from "react-icons/ri";
import { RiCheckLine } from "react-icons/ri";
import { FaRegClock } from "react-icons/fa";
import moment from 'moment';

function MyMessage({ msgObj }) {
  console.log(msgObj?.isRead)
  return (
    <div class="flex justify-end mb-2">
        <div class="rounded py-2 px-4 bg-lime-200" >
            <p class="text-md  mt-1">
              {msgObj?.message}
            </p>
            <div class="flex justify-end items-end text-xs text-gray-500 mt-1">
              <small>{moment(msgObj?.createdAt).format('MMMM Do, YYYY ◾ h:mm A')}</small>
              {
                (msgObj?.isRead === true) ?  
                  <span class="text-blue-500 mx-2 text-lg"><RiCheckDoubleFill/></span>
                  : <span class="text-gray-400 ms-2 text-xl"><RiCheckDoubleFill/></span>
              }
              {/* not sent */}
              {/* <span class="text-gray-400 mx-2 text-sm"><FaRegClock/></span> */}
            </div>
        </div>
    </div>
  )
}

export default MyMessage