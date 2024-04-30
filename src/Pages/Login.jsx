import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../apiservices/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate()
  const [userData,setUserData] = useState({
    email:"",password:""
  })
  console.log(userData);

  const handleLogin = async(e) => {
    e.preventDefault()
    const { email, password } = userData
    if(!email || !password){
      toast.info("Please fill all the fields")
    }else{
      try {
        const result = await loginAPI(userData)
        console.log(result);
        if(result.status === 200){
         toast.success("Login Successfull")
         localStorage.setItem("token",result.data.token)
         setUserData({
          email:"",password:""
         })
        setTimeout(() => {
          navigate('/add-carousel')
        },3000)
        }else{
          toast.error(result.response.data.message)
        }
      } catch (error) {
        console.log(error);
      }
  }
}
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
    <div className="max-w-xl mx-4 md:mx-auto bg-white p-8 rounded-lg shadow-md flex">
      <div className="w-[100%] p-6">
        <h2 className="text-4xl font-semibold text-center mb-10">Welcome Back!</h2>
        <form className="flex flex-col space-y-8">
          <input
          onChange={(e)=>{setUserData({...userData,email:e.target.value})}}
            type="email"
            placeholder="Email"
            className="border-2 rounded-lg px-10 py-1"
          />
          <input
          onChange={(e)=>setUserData({...userData,password:e.target.value})}
            type="password"
            placeholder="Password"
            className="border-2 rounded-lg px-10 py-1"
          />
          <button onClick={handleLogin} className="bg-blue-500 text-white rounded-lg  py-2 ">Submit</button>
        </form>
      </div>
    </div>
    <ToastContainer  autoClose={2500} />
  </div>
  )
}

export default Login