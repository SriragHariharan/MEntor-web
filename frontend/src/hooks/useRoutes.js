import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

//layouts
import MenteeRootLayout from '../layouts/RootLayout';

//pages
import LandingPage from '../pages/LandingPage';
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import MenteeProtectedRoutes from '../layouts/MenteeProtectedRoutes';
import ProfilePage from '../pages/MyProfilePage';
import Mentors from '../pages/Mentors';
import Notifications from '../pages/Notifications';
import InterviewsPage from '../pages/InterviewsPage';
import AuthRoutes from '../layouts/AuthRoutes';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import ForgotPassword from '../pages/authentication/ForgotPassword';
import ResetPassword from '../pages/authentication/ResetPassword';
import VerifyEmail from '../pages/authentication/VerifyEmail';
import SelectRole from '../pages/authentication/SelectRole';
import { useDispatch, useSelector } from 'react-redux';
import VerifyPwdOtp from "../pages/authentication/VerifyPwdOtp";
import { jwtDecode } from 'jwt-decode';
import { logoutUserAction } from "../redux toolkit/userSlice";
import { showErrorToast } from "../helpers/ToastMessageHelpers";
import OtherProfile from "../pages/OtherProfile";
import AddSlotsPage from "../pages/AddSlotsPage";
import Chats from "../pages/Chats";
import MentorProtectedRoutes from "../layouts/MentorProtectedRoutes";
import MentorSignup from "../pages/authentication/MentorSignup";
import MentorApprovalPage from "../pages/MentorApprovalPage";
import UserBlocked from "../pages/UserBlocked";
import NotFound404 from "../pages/NotFound404";
import Followers from "../pages/Followers";
import MenteeMeetingPage from "../pages/MenteeMeetingPage";
import MentorMeetingPage from "../pages/MentorMeetingPage";
import Webinars from "../pages/Webinars";
import WebinarDetails from "../pages/WebinarDetails";
import Rooms from "../pages/Rooms";
import ActiveRoom from "../pages/ActiveRoom";
import Revenue from "../pages/Revenue";
import MentorDashboard from "../pages/MentorDashboard";
import MenteeDashboard from "../components/mentee/MenteeDashboard";

function useRoutes() {
	const dispatch = useDispatch();

	setInterval(() =>{
		const token = localStorage.getItem('MEntor_token');
		if (token) {
			const decodedToken = jwtDecode(token);
			const expirationTime = decodedToken.exp * 1000; // convert to milliseconds
	
			if (expirationTime < Date.now()) {
				showErrorToast("Session expired. Login to continue")
				dispatch(logoutUserAction())
			}else{
				console.log("token not expired");
			}
		}
	}, 3000000000000)

	//validate user and verify token
	const USER = useSelector(store => store?.user);
	console.log("AT : ",USER);
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				<Route path="/" element={<LandingPage />} />
				<Route path="/:id/profile" element={<OtherProfile />} />
				{/* mentee routes */}
				{/* <Route path="/user" element={<MenteeRootLayout />}> */}
                    <Route path='/auth' element={<AuthRoutes user={USER?.token} role={USER?.role} />}>
                        <Route path="login" element={<Login />} />
                        <Route path="/auth/mentee" element={<Signup />} />
						<Route path="/auth/mentor" element={<MentorSignup />} />
						<Route path="verifyOTP" element={<VerifyOtp />} />
						<Route path="verify-email" element={<VerifyEmail />} />
						<Route path="forgot-password" element={<ForgotPassword />} />
						<Route path="reset-password" element={<ResetPassword />} />
						<Route path="select-role" element={<SelectRole />} />
						<Route path="verify-password-otp" element={<VerifyPwdOtp />} />
						<Route path="approval" element={<MentorApprovalPage />} />
						<Route path="blocked" element={<UserBlocked />} />
                    </Route>
				{/* </Route> */}

				{/* Mentee Protected Routes */}
				<Route path='/mentee' element={<MenteeProtectedRoutes user={USER?.token} role={USER?.role}  />}>
					<Route path="/mentee/dashboard" element={<MenteeDashboard />} />
					<Route path="/mentee/profile" element={<ProfilePage />} />
					<Route path="/mentee/mentors" element={<Mentors />} />
					<Route path="/mentee/notifications" element={<Notifications />} />
					<Route path="/mentee/interviews" element={<InterviewsPage />} />
					<Route path="/mentee/chats" element={<Chats />} />
					<Route path="/mentee/interview/:meetingID" element={<MenteeMeetingPage />} />
					<Route path="/mentee/webinars" element={<Webinars mentor={false} />} />
					<Route path="/mentee/webinar/:id" element={<WebinarDetails mentor={false} />} />
					<Route path="/mentee/rooms" element={<Rooms mentor={false} />} />
					<Route path="/mentee/room/:id" element={<ActiveRoom/>} />
				</Route>
                
				{/* mentor routes */}
				<Route path='/mentor' element={<MentorProtectedRoutes user={USER?.token} role={USER?.role}  />}>
					<Route path="/mentor/dashboard" element={<MentorDashboard />} />
					<Route path="/mentor/profile" element={<ProfilePage />} />
					<Route path="/mentor/notifications" element={<Notifications />} />
					<Route path="/mentor/interviews" element={<InterviewsPage />} />
					<Route path="/mentor/slots/" element={<AddSlotsPage />} />
					<Route path="/mentor/chats" element={<Chats />} />
					<Route path="/mentor/mentees" element={<Followers />} />
					<Route path="/mentor/interview/:meetingID" element={<MentorMeetingPage />} />
					<Route path="/mentor/webinars" element={<Webinars mentor={true}  />} />
					<Route path="/mentor/webinar/:id" element={<WebinarDetails mentor={true} />} />
					<Route path="/mentor/rooms" element={<Rooms mentor={true} />} />
					<Route path="/mentor/room/:id" element={<ActiveRoom/>} />
					<Route path="/mentor/revenue" element={<Revenue />} />
				</Route>

				<Route path="*" element={<NotFound404 />} />
			</>
		)
	);
  
  
    return router;
}

export default useRoutes