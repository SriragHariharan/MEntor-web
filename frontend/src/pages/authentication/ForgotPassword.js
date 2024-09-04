import React from 'react'
import logo from '../../assets/images/landingpage/mentor logo.jpg'
import { useForm } from "react-hook-form";

function ForgotPassword() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);

  return (
    <div class="h-screen flex items-center justify-center bg-teal-50">
        <div class="max-w-xl w-full m-auto p-6 my-12">
            <h2 class="text-3xl md:text-5xl font-semibold my-2">Forgot your password?</h2>
            <p class="text-xl md:text-2xl text-gray-800 dark:text-gray-400 mb-8">You'll get an email with otp</p>
            <form  onSubmit={handleSubmit(onSubmit)}>
                <div class="mb-4">
                    <label class="block text-gray-700" for="email">Email address</label>
                    <input {...register("email", {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} type="email" class="w-full pl-4 text-sm text-gray-700" placeholder="your-email@example.com" />
                    {errors.email?.type === 'required' && <p style={{color:'red'}}>email required</p>}
                    {errors.email?.type === 'pattern' && <p style={{color:'red'}}>Please check your email</p>}
                </div>
                <button type='submit' class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Request OTP</button>
            </form>
            <div className="flex justify-center mt-24">
                <img src={logo} width="150" alt="mentor brand logo" className='mb-4' />
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword