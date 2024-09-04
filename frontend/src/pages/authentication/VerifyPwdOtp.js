//page for users to type otp for forgot password

import React, {useState, useEffect} from 'react';
import logo from "../../assets/images/landingpage/mentor logo.jpg";
import { useForm } from "react-hook-form";
import { resendSignupOtp, verifyResetPasswordOTP } from '../../helpers/authHelpers';
import { showErrorToast } from '../../helpers/ToastMessageHelpers';
import { useNavigate } from 'react-router-dom';

function VerifyPwdOtp() {
    const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	const navigate = useNavigate()	
	
	//submitting otp to verify in the server
	const onSubmit = (data) => {
		verifyResetPasswordOTP(data?.otp)
		.then(resp => {
			//store a temporary token in localhost for security
			localStorage.clear();
			localStorage.setItem('MEntor_temp_token', resp.data.tempToken)
			console.log(resp.data)
			navigate("/auth/reset-password")
		})
		.catch(err => showErrorToast(err))
	}

	//counter functionality
	const [timer, setTimer] = useState(localStorage.getItem('MEntor_forgot_password_timer') || process.env.REACT_APP_OTP_TIME); //in seconds
	useEffect(() => localStorage.setItem('MEntor_forgot_password_timer', timer), [timer]);
	useEffect(() => {
		if (timer > 0) {
		const intervalId = setInterval(() => {
			setTimer(timer - 1);
		}, 1000);
		return () => clearInterval(intervalId);
		}
  	}, [timer]);
	const formatTime = (seconds) => {
		let minutes = Math.floor(seconds / 60);
		let secondsRemaining = seconds % 60;

		return `${minutes}:${secondsRemaining.toString().padStart(2, '0')}`;
  	};

  	//resend otp on timer expiration
	const handleResendOtp = () => {
		resendSignupOtp()

		console.log("time to resend OTP");
		localStorage.removeItem("MEntor_signup_timer")
		setTimer(process.env.REACT_APP_OTP_TIME)
	}

	return (
		<div className="h-screen flex flex-col justify-center bg-teal-50">
			<div class="flex items-center justify-center">
				<div class="max-w-sm w-full mx-auto p-6 my-10">
					<div class="text-center">
						<h2 class="text-2xl md:text-3xl font-semibold my-2">
							Verify your Email
						</h2>
					</div>
					<div class="text-center text-sm md:text-md text-gray-800 dark:text-gray-400 my-2">
						Please introduce the 6 digit code we sent via email.
					</div>
					<form
						class="flex flex-col justify-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							{...register("otp", {
								required: true,
								minLength: 6,
								maxLength: 6,
							})}
							type="text"
							class="w-full pl-4 text-sm text-gray-700"
						/>
						{errors.otp?.type === "required" && (
							<p style={{ color: "red" }}>OTP required</p>
						)}
						{(errors.otp?.type === "minLength" || errors.otp?.type === 'maxLength') && (
							<p style={{ color: "red" }}>
								OTP should be 6 characters long
							</p>
						)}
						<span className="text-xl">Resend OTP in: {formatTime(timer)}</span>
                        {timer > 0 && <button type="submit" className='bg-green-500 p-2 text-white w-full mt-6 rounded-md'>Verify OTP</button> }
					</form>
					{
						 (timer <= 0 ) && <div onClick={handleResendOtp} className='bg-green-500 p-2 text-white w-full mt-6 rounded-md text-center cursor-pointer'>Resend OTP</div>
					}
				</div>
			</div>
			<div className="flex justify-center">
				<img src={logo} alt="brand logo" width="100" />
			</div>
		</div>
	);
}

export default VerifyPwdOtp;
