import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import ENDPOINTS from '../configs/endpoints';
import useAxios from '../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { SignupContext } from '../contexts/userContext';


function Login() {
    const axiosInstance = useAxios();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(null)

    const { signup } = useContext(SignupContext);

    const onSubmit = (data) => {
        console.log(data);
        axiosInstance.post(ENDPOINTS.LOGIN, data)
        .then(resp => {
            signup();
            navigate("/")
        })
        .catch(err => setError(err?.response?.data?.message));
    } 

  return (
    <section class="bg-gray-200 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            {/* <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img class="h-12 mr-2" src={logo} alt="logo" />
            </div> */}
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <p className="text-center text-red-500 font-bold">{error}</p>
                    <form class="space-y-4 md:space-y-6"  onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input value={"admin@mentor.app"} {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} type="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required="" />
                            {errors.email?.type === "required" && (<small style={{ color: "red" }}>email required</small>)}
                            {errors.email?.type === "pattern" && (<small style={{ color: "red" }}>Please check your email</small>)}
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input value={"admin@mentor.app"} {...register("password", {required: true, minLength: 6})} type="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required="" />
                            {errors.password?.type === "required" && (<small style={{ color: "red" }}>Password required</small>)}
							{errors.password?.type === "minLength" && (<small style={{ color: "red" }}>Password should me 6 or more characters</small>)}
                        </div>
                        <button type="submit" class="w-full text-white bg-green-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
    )
}

export default Login