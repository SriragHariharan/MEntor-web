import React from 'react'
import { useForm } from 'react-hook-form';
import logo from "../../assets/images/landingpage/mentor logo.jpg";
import { googleSignupUserWithRole } from '../../helpers/authHelpers';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../redux toolkit/userSlice';
import { showErrorToast } from '../../helpers/ToastMessageHelpers';

function SelectRole() {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        //submit form to verify the role
        console.log(data);
        googleSignupUserWithRole({role:data.role, token:localStorage.getItem('MEntor_temp_token')})
        .then(resp => {
            console.log(resp);
            dispatch(loginUserAction(resp.data))
            navigate("/mentee/profile")
        })
        .catch(err => showErrorToast(err))

    } 

   return (
    <div className="h-screen flex flex-col justify-center bg-teal-50">
			<div class="flex items-center justify-center">
				<div class="max-w-md w-full mx-auto">
					<img
						src={logo}
						width="150"
						alt="mentor brand logo"
						className="mb-4"
					/>
					<h2 class="text-xl mb-2">Select your role @ MEntor</h2>
					{/* login form */}
					<form onSubmit={handleSubmit(onSubmit)}>
						<div class="mb-4">
							<select
								{...register("role", {required: true})}
								class="w-full pl-4 text-sm text-gray-700"
							>
								<option value="">Select Role</option>
								<option value="mentor">Mentor</option>
								<option value="mentee">Mentee</option>
							</select>
							{errors.role?.type === "required" && (
								<small style={{ color: "red" }}>
									Role is required
								</small>
							)}
						</div>
						<button
							type="submit"
							class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
						>
							Sign in now
						</button>
					</form>
				</div>
			</div>
		</div>
  )
}

export default SelectRole