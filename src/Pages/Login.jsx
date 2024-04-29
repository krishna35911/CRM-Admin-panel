import React from 'react'
import Sidebar from '../components/Sidebar'

function Login() {
  return (
  <>
      <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="max-w-xl mx-4 md:mx-auto bg-white p-8 rounded-lg shadow-md flex">
        <div className="w-[100%] p-6">
          <h2 className="text-4xl font-semibold text-center mb-10">Welcome Back!</h2>
          <form className="flex flex-col space-y-8">
            <input
              type="text"
              placeholder="Username"
              className="border-2 rounded-lg px-10 py-1"
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 rounded-lg px-10 py-1"
            />
            <button className="bg-blue-500 text-white rounded-lg  py-2 ">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default Login
