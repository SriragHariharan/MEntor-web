import React from 'react'
import { DEFAULT_USER_IMG } from '../../helpers/CONSTANTS'

function RoomUser() {
  return (
    <div>
        <img src={DEFAULT_USER_IMG} alt="user logo" className='rounded-full w-36 h-36 border-[6px] border-green-400 my-4 ' />
    </div>
  )
}

export default RoomUser;