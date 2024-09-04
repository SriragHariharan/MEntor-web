import React from 'react'
import logo from "../../assets/images/landingpage/mentor logo.jpg";
import { useForm } from 'react-hook-form';
import { verifyEmail } from '../../helpers/authHelpers';
import { useNavigate } from 'react-router-dom';
import { showErrorToast } from '../../helpers/ToastMessageHelpers';


function VerifyEmail() {
    const { register, formState: { errors }, handleSubmit } = useForm();
	const navigate = useNavigate();

    const onSubmit = (data) => {
		console.log(data);
		localStorage.setItem("mentor_otp_verification_email", data.verificationEmail)
		verifyEmail(data.verificationEmail)
		.then(resp => {
			navigate("/mentee/verify-password-otp")
		})
		.catch(err => showErrorToast(err))
	}

  return (
    <div className="h-screen flex flex-col justify-center bg-teal-50">
			<div class="flex items-center justify-center">
				<div class="max-w-sm w-full mx-auto p-6 my-10">
					<div class="text-center">
						<h2 class="text-2xl md:text-3xl font-semibold my-2">
							Enter your Email
						</h2>
					</div>
					<div class="text-center text-sm md:text-md text-gray-800 dark:text-gray-400 my-2">
						We will send an otp to your email now
					</div>
					<form
						class="flex flex-col justify-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							{...register("verificationEmail", {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})}
							type="email"
							class="w-full pl-4 text-sm text-gray-700"
						/>
						{errors.email?.type === 'required' && <p style={{color:'red', marginTop:'-17px'}}>email required</p>}
                        {errors.email?.type === 'pattern' && <p style={{color:'red', marginTop:'-17px'}}>Please check your email</p>}
                        <button type="submit" className='bg-green-500 p-2 text-white w-full mt-6 rounded-md'>Request OTP</button>
					</form>
				</div>
			</div>
			<div className="flex justify-center">
				<img src={logo} alt="brand logo" width="100" />
			</div>
		</div>
  )
}

export default VerifyEmail