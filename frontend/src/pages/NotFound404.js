import React from 'react'
import { Link } from 'react-router-dom'

function NotFound404() {
  return (
    <section class="h-screen flex items-center bg-gray-900">
        <div class="py-8 px-4 mx-auto lg:py-16 lg:px-6">
            <div class="mx-auto text-center">
                <h1 class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-green-500">404</h1>
                <p class="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">Something's missing.</p>
                <p class="mb-4 text-lg font-light text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
                <Link to={"/"} class="inline-flex text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</Link>
            </div>   
        </div>
    </section>
  )
}

export default NotFound404