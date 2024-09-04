import React from 'react';
import moment from 'moment';
function TodayWebinars({ todaysWebinars }) {
    

  return (
    <div className='border-2 p-2 w-full'>
        <div className="text-center text-gray-500 font-xl underline my-4">Today's Webinars</div>
        {
            todaysWebinars?.map( t => (
                <div className="flex justify-between items-center shadow-xl p-2">
                    <img src={t?.banner} alt="banner" className='w-48 h-auto rounded-xl' />
                    <div className="text-gray-700 font-semibold">{t?.title}</div>
                    <div className="text-gray-700 font-extrabold">$ {t?.amount}</div>
                    <div className="text-gray-700">Participants: {t?.participants?.length}</div>
                    <div className="text-gray-700 font-extralight">{moment(t?.date).format('MMMM Do, YYYY ◾ h:mm A')}</div>

                </div>
            ))
        }
    </div>
  )
}

export default TodayWebinars