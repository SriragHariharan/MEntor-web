import React from 'react'
import { useForm } from 'react-hook-form';
import logo from "../../assets/images/landingpage/mentor logo.jpg";
import { resetPassword } from '../../helpers/authHelpers';
import { showErrorToast, showSuccessToast } from '../../helpers/ToastMessageHelpers';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

    const { register, formState: { errors }, watch, handleSubmit } = useForm();
	const navigate = useNavigate();

    const onSubmit = (data) => {
		resetPassword(data.password)
		.then(resp => {
			console.log("resp :::", resp)
			showSuccessToast(resp.message);
			navigate("/mentee/login");
			return
		})
		.catch(err => {
			showErrorToast(err);
			navigate("/mentee/verify-email")
		})
	}

  return (
    <div className="h-screen flex flex-col justify-center bg-teal-50">
			<div class="flex items-center justify-center">
				<div class="max-w-sm w-full mx-auto p-6 my-10">
					<div class="text-center">
						<h2 class="text-2xl md:text-3xl font-semibold my-4">
							Enter new password
						</h2>
					</div>
					<form
						class="flex flex-col justify-center"
						onSubmit={handleSubmit(onSubmit)}
					>
						<input
							{...register("password", { required: true, minLength:6 })} type="password" placeholder='Enter your new password'
							class="w-full pl-4 text-sm text-gray-700"
						/>
						{errors.password?.type === "required" && (
							<small style={{ color: "red" }}>OTP required</small>
						)}
						{(errors.password?.type === "minLength" || errors.password?.type === 'maxLength') && (
							<small style={{ color: "red" }}>
								OTP should be 6 characters long
							</small>
						)}
                        <input
							{...register("confirm_password", {
                              required: true,
                              validate: (val) => {
                                if (watch('password') !== val) {
                                  return "passwords mismatch";
                                }
                              },
                            })} type="password"
                            placeholder='Confirm Password'
							class="w-full pl-4 mt-6 text-sm text-gray-700"
						/>
						{errors.password?.type === "required" && (
							<small style={{ color: "red" }}>OTP required</small>
						)}
						{errors.confirm_password?.type === 'validate' && <p style={{color:'red'}}>Passwords doesnt match</p>}
                        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                            Please introduce the 6 digit code we sent via email.
                        </p>
                        <button type="submit" className='bg-green-500 p-2 text-white w-full mt-6 rounded-md'>Change Password</button>
					</form>
				</div>
			</div>
			<div className="flex justify-center">
				<img src={logo} alt="brand logo" width="100" />
			</div>
		</div>
  )
}

export default ResetPassword