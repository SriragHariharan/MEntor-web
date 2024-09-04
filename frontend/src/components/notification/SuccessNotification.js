import React from 'react'

function SuccessNotification() {
  return (
        <div class="w-full p-3 mt-1 bg-teal-100 flex items-center">
            <div tabindex="0" class="focus:outline-none flex flex-shrink-0 items-center justify-center">
                <img className='w-10 h-10 rounded-full object-cover' src="https://th.bing.com/th/id/OIP._IuQ_gyTEh4OsB4TxqSHywHaEz?rs=1&pid=ImgDetMain" alt="Rounded avatar" />
            </div>
            <div class="pl-3 w-full">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-sm leading-none text-green-700">Srirag H followed you</p>
                </div>
            </div>
        </div>
  )
}

export default SuccessNotification