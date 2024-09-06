import React, { useEffect, useState } from 'react'
import logo from "../../assets/images/landingpage/mentor logo.jpg";

//react icons
import { MdDashboardCustomize } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa6";
import { BsChatSquareText } from "react-icons/bs";
import { FaGear } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { IoIosHelpCircleOutline } from "react-icons/io";

import { MdDarkMode } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux toolkit/themeSlice';
import { logoutUserAction } from '../../redux toolkit/userSlice';
import { DEFAULT_USER_IMG } from '../../helpers/CONSTANTS';
import { axiosInstance } from '../../helpers/axios';

import toast from 'react-hot-toast';
import { generateToken, messaging } from "../../helpers/firebase";
import { onMessage } from "firebase/messaging";
import PushNotification from '../../components/notification/PushNotification';


function Navbar() {
	const dispatch = useDispatch();
	const isDarkTheme = useSelector((store) => store?.isDark?.isThemeDark);
	const logoutMentee = () => {
		dispatch(logoutUserAction())
	}

	const [userProfile, setUserProfile] = useState(null);
	const profilePic = useSelector(store => store.profile?.profilePic);

	useEffect(() => {
		axiosInstance.post(process.env.REACT_APP_PROFILE_SVC_ENDPOINT + "/profile")
		.then(resp => {
			setUserProfile(resp?.data?.profileDetails)
		});
	}, [])

	//firebase cloud messaging recieve foreground messages
	//get notification permission
	useEffect(() => {
		generateToken();

		//for foreground messages
		onMessage(messaging, (payload) => {
			console.log(payload, "foreground ");
			//show custom toast message
			toast.custom((t) => <PushNotification payload={payload} t={t} />)
		});
	},[])



  return (
		<div className="">
			{/* place below navbar code here */}
			<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start rtl:justify-end">
							<button
								data-drawer-target="separator-sidebar"
								data-drawer-toggle="separator-sidebar"
								aria-controls="separator-sidebar"
								type="button"
								className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							>
								<span className="sr-only">Open sidebar</span>
								<i className="fa-solid fa-bars"></i>
							</button>
							<div className="flex ms-2 md:me-24">
								<img
									src={logo}
									className="h-12 me-3"
									alt="MEntor Logo"
								/>
							</div>
						</div>
						<div className="flex items-center">
							<div className="flex items-center ms-3">
								<div className="flex items-center gap-4">
									<div className="text-semibold font-xl  md:hidden">{userProfile?.username.slice(0, 6)}...</div>	
									<div className="text-semibold font-xl hidden md:block">{userProfile?.username}</div>					
									{isDarkTheme ? (
										<IoMdSunny onClick={() => dispatch(toggleTheme())} className="cursor-pointer w-6 h-6 text-yellow-300" />
										) : (
										<MdDarkMode  onClick={() => dispatch(toggleTheme())} className="cursor-pointer w-6 h-6 text-gray-500" />
									)}
                                    <img
                                        className="w-10 h-10 rounded-full cursor-pointer object-cover"
                                        src={profilePic ?? DEFAULT_USER_IMG}
                                        alt="user"
                                    />		
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<aside
				id="separator-sidebar"
				className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidebar"
			>
				<div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
					<div>
						<img src={logo} className="h-12 me-3" alt="MEntor Logo" />
					</div>
					<hr />
					<div className="space-y-2 font-medium  mt-4">
						<Link to={"/mentee/dashboard"} className="flex items-center p-2 text-green-500">
							<MdDashboardCustomize className="text-2xl" />
							<span className="ms-3">Dashboard</span>
						</Link>
						<Link
							to="/mentee/mentors"
							className="flex items-center p-2 text-green-500"
						>
							<FaPeopleGroup className="text-2xl" />
							<span className="ms-3">Mentors</span>
						</Link>
						<Link to={"/mentee/webinars"} className="flex items-center p-2 text-green-500">
							<FaLaptopCode className="text-2xl" />
							<span className="ms-3">Webinars</span>
						</Link>
						<Link to={"/mentee/chats"} className="flex items-center p-2 text-green-500">
							<BsChatSquareText className="text-2xl" />
							<span className="ms-3">Chats</span>
						</Link>
						<Link
							to="/mentee/profile"
							className="flex items-center p-2 text-green-500"
						>
							<FaGear className="text-2xl" />
							<span className="ms-3">Profile</span>
						</Link>
						<Link
							to="/mentee/interviews"
							className="flex items-center p-2 text-green-500"
						>
							<MdWork className="text-2xl" />
							<span className="ms-3">Interviews</span>
						</Link>
						<Link
							to="/mentee/notifications"
							className="flex items-center p-2 text-green-500"
						>
							<AiOutlineBell className="text-2xl" />
							<span className="ms-3">Notifications</span>
						</Link>
					</div>
					<div className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
						<div className="flex items-center p-2 text-gray-500">
							<IoIosHelpCircleOutline className="text-2xl" />
							<span className="ms-3">Help</span>
						</div>
						<div onClick={logoutMentee} className="flex items-center p-2 text-red-500">
							<AiOutlineLogout className="text-2xl" />
							<span className="ms-3">Logout</span>
						</div>
					</div>
				</div>
			</aside>
		</div>
  );
}

export default Navbar;
