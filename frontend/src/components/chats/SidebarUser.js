import React from 'react'
import { DEFAULT_USER_IMG } from '../../helpers/CONSTANTS'

function SidebarUser({ details, setSelectedChat }) {
    
    const handleChatSelect = ()=>{
        setSelectedChat(details)
    }
  return (
        <div onClick={handleChatSelect} class="bg-white px-3 py-1 flex items-center hover:bg-grey-lighter cursor-pointer">
            <div>
                <img class="h-12 w-12 rounded-full object-cover" src={details?.profilePic?.secure_url ?? DEFAULT_USER_IMG}/>
            </div>
            <div class="ml-4 flex-1 border-b border-grey-lighter py-4">
                <div class="flex items-bottom justify-between">
                    <p class="text-grey-darkest text-xs">
                        {details.username}
                    </p>
                    {/* <small class="text-xs text-grey-darkest">
                        12:45 pm
                    </small> */}
                </div>
                {/* <p class="text-slate-500 mt-1 text-sm">
                    No messages yet
                </p> */}
            </div>
        </div>
  )
}

export default SidebarUser

