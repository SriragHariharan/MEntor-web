import React from 'react'
import toast from 'react-hot-toast';
import logo from '../../assets/images/landingpage/mentor logo.jpg'

function PushNotification({ payload, t }) {
    return(
        <div className={`${ t.visible ? 'animate-enter' : 'animate-leave'} max-w-lg py-2 w-full bg-gray-200 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-2">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-10 w-30"
                            src={logo}
                            alt="MEntor logo"
                        />
                    </div>
                    <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                        🟢{payload?.notification?.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                        {payload?.notification?.body}
                    </p>
                    </div>
                </div>
                </div>
                <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Close
                </button>
            </div>
        </div>
    ) 
}

export default PushNotification