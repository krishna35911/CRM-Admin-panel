import React, { useEffect, useState } from 'react'
import { getleavesAPI, protectedAPI } from '../../apiservices/allAPI';
import Sidebar from '../../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllLeaves() {
const [leaves,setLeaves]=useState([])
  const handleProtectedCheck = async()=>{
    const token = localStorage.getItem("token")
    console.log(token);
    if(!token){
      navigate("/")
    }else{
      const reqHeader = {"x-access-token":token}
      const result = await protectedAPI(reqHeader)
      console.log(result); 
      if(result.status!==200){
        navigate("/")
      }
    }
  }

  const getLeaves = async () => {
    try{
      const reqHeader={"x-access-token":localStorage.getItem("token")}
      const res= await getleavesAPI(reqHeader)
      if(res.status===200){
        setLeaves(res.data)
        console.log("leaves",res.data);
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    handleProtectedCheck()
    getLeaves()
  },[])

  return (
    <div className="lg:flex">
      <Sidebar />
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-8 text-center">All LEAVES</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-collapse   border-gray-400  rounded-lg overflow-x-auto">
              <thead>
                <tr >
                  <th className="border border-gray-400  px-4 py-2 ">LeaveDate</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Duration</th>
                  <th className="border  border-gray-400   px-4 py-2 ">PermissionDetails</th>
                  <th className="border  border-gray-400   px-4 py-2 ">AssignmentAssignedTo</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Actions</th>

                </tr>
              </thead>
              <tbody className="text-center   bg-gray-300">
                {leaves?.length>0 ?
                leaves.map((lev,index)=>(
                    <tr key={index} className='border border-gray-400'>
                    <td className="border  border-gray-400  px-4 py-2">{lev?.LeaveDate}</td>
                    <td className="border  border-gray-400   px-4 py-2">{lev?.Duration}</td>
                    <td className="border  border-gray-400   px-4 py-2">{lev?.PermissionDetails}</td>
                    <td className="border  border-gray-400   px-4 py-2">{lev?.AssignmentAssignedTo}</td>
                  
                    {/* <td className="border  border-gray-400    px-4 py-2">
                      <img src={crm?.image} alt={crm?.title} className="w-16 h-16 object-cover mx-auto" />
                    </td> */}
                    <td className="border  border-gray-400    px-4 py-2">
                      <Link  className="text-blue-800 ">
                      <i class="fa-solid fa-pen"></i>
                      </Link>

                      <button  type='button' className="text-red-600 ms-6">
                      <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                )):<p>No data available</p>
                  }               
              </tbody>
              <ToastContainer  autoClose={2500} />
            </table>
          </div>
        </div>
    </div>
    </div>
  )
}

export default AllLeaves;
