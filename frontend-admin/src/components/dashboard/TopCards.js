import { PiStudent } from "react-icons/pi";
import { CiDollar } from "react-icons/ci";
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { PiHandshakeThin } from "react-icons/pi";
import useGetUsersCount from "../../hooks/useGetUsersCount";
import useGetTransactions from "../../hooks/useGetTransactions";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import ENDPOINTS from "../../configs/endpoints";

function TopCards({ webinars }) {

    const users = useGetUsersCount();
    const  {revenue, monthlyRevenue} = useGetTransactions();
    const axios = useAxios();
    const[interviews,setInterviews] = useState(null);
    console.log(interviews);

    useEffect(() => {
        axios.get(ENDPOINTS.MEETINGS_COUNT)
        .then(resp => setInterviews(resp?.data?.data))
        .catch(err => console.log(err));
    },[])

  return (
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5">

                <div className="relative bg-white py-6 px-6 rounded-3xl w-52 my-4 shadow-xl">
                    <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-pink-500 left-4 -top-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="mt-8">
                        <p className="text-xl font-semibold my-2">Mentors</p>
                        <div className="border-t-2"></div>
                        <p className="font-bold text-4xl">{users?.mentor}</p>
                        <div className="border-t-2"></div>
                        <p className="font-regular text-xs">{users?.mentor} new mentor(s) this month</p>
                    </div>
                </div>


                <div className="relative bg-white py-6 px-6 rounded-3xl w-52 my-4 shadow-xl">
                    <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-green-500 left-4 -top-6">
                        <PiStudent className="text-4xl" />
                    </div>
                    <div className="mt-8">
                        <p className="text-xl font-semibold my-2">Mentees</p>
                        <div className="border-t-2"></div>
                        <p className="font-bold text-4xl">{users?.mentee}</p>
                        <div className="border-t-2"></div>
                        <p className="font-regular text-xs">{users?.mentor} new mentee(s) this month</p>
                    </div>
                </div>


                <div className="relative bg-white py-6 px-6 rounded-3xl w-52 my-4 shadow-xl">
                    <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-blue-500 left-4 -top-6">
                        <CiDollar className="text-4xl"/>
                    </div>
                    <div className="mt-8">
                        <p className="text-xl font-semibold my-2">Revenue (total)</p>
                        <div className="border-t-2"></div>
                        <p className="font-bold text-4xl">{revenue}</p>
                        <div className="border-t-2"></div>
                        <p className="font-regular text-xs">${monthlyRevenue} generated this month</p>
                    </div>
                </div>

                <div className="relative bg-white py-6 px-6 rounded-3xl w-52 my-4 shadow-xl">
                    <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-yellow-500 left-4 -top-6">
                        <LiaLaptopCodeSolid className="text-4xl" />
                    </div>
                    <div className="mt-8">
                        <p className="text-xl font-semibold my-2">Webinars</p>
                        <div className="border-t-2 "></div>
                        <p className="font-bold text-4xl">{webinars?.webinars}</p>
                        {/*  <div className="border-t-2"></div>
                        <p className="font-regular text-xs">{users?.mentor} webinar(s) this month</p> */}
                    </div>
                </div>

                <div className="relative bg-white py-6 px-6 rounded-3xl w-52 my-4 shadow-xl">
                    <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-yellow-300 left-4 -top-6">
                        <PiHandshakeThin className="text-4xl" />
                    </div>
                    <div className="mt-8">
                        <p className="text-xl font-semibold my-2">Meetings</p>
                        <div className="border-t-2 "></div>
                        <p className="font-bold text-4xl">{interviews?.interviewsCount}</p>
                        <div className="border-t-2"></div>
                        <p className="font-regular text-xs">{interviews?.monthlyInterviews?.length} meeting(s) this month</p>
                    </div>
                </div>

            </div>
        </div>
  )
}

export default TopCards