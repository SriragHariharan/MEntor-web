import React from 'react'
import { PiStudent } from "react-icons/pi";
import { CiDollar } from "react-icons/ci";
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { PiHandshakeThin } from "react-icons/pi";
import DashboardTopcard from '../components/mentor/DashboardTopcard';
import TodaysMeetings from '../components/mentor/TodaysMeetings';
import TodaysWebinars from '../components/mentor/TodaysWebinars';

function MentorDashboard() {
  return (
        <div className="py-16 dark:bg-gray-800">
            <DashboardTopcard />
            <div className="my-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 xl:px-12 xl:gap-4">
                    <TodaysWebinars />
                    <TodaysMeetings />
                </div>
            </div>
        </div>
  )
}

export default MentorDashboard