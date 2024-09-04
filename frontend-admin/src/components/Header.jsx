import React, { useContext } from 'react'
import logo from "../assets/mentor logo.jpg";

//react icons
import { MdDashboardCustomize } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { AiOutlineLogout } from "react-icons/ai";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { PiStudentBold } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";

import { Link } from 'react-router-dom';
import { SignupContext } from '../contexts/userContext';

function Navbar() {
	const { logout } = useContext(SignupContext);
	const handleLogout = () => {
		logout();
	}
  return (
		<div className="">
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
							<div className="text-xl font-semibold">
								Welcome admin <span className="text-xs">🟢</span> 
								<div className='text-xs font-extralight italic'>
									<span className="font-semibold">Login:</span>
									{new Date().toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })} 
									{" "}{" "} @ {" "}{" "} 
									{new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit'})}
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
					<div className="space-y-2 font-medium  mt-16">
						<Link to="/" className="flex items-center p-2 text-green-500">
							<MdDashboardCustomize className="text-2xl" />
							<span className="ms-3">Dashboard</span>
						</Link>
						<Link to="/mentors" className="flex items-center p-2 text-green-500">
							<FaPeopleGroup className="text-2xl" />
							<span className="ms-3">Mentors</span>
						</Link>
                        <Link to="/mentees" className="flex items-center p-2 text-green-500">
							<PiStudentBold className="text-2xl" />
							<span className="ms-3">Mentees</span>
						</Link>
						<Link to="/transactions" className="flex items-center p-2 text-green-500">
							<RiMoneyRupeeCircleFill className="text-2xl" />
							<span className="ms-3">Revenue</span>
						</Link>
                        <Link to="/approvals" className="flex items-center p-2 text-green-500">
							<SiTicktick className="text-2xl" />
							<span className="ms-3">Approvals</span>
						</Link>
					</div>
					<div className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
						<div className="flex items-center p-2 text-gray-500">
							<IoIosHelpCircleOutline className="text-2xl" />
							<span className="ms-3">Help</span>
						</div>
						<div onClick={handleLogout} className="flex items-center p-2 text-red-500 cursor-pointer">
							<AiOutlineLogout className="text-2xl" />
							<span className="ms-3">Logout</span>
						</div>
					</div>
				</div>
			</aside>
		</div>
  );
}

export default Navbar