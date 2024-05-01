import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteCalenderEventsAPI, getCalenderEventsAPI, protectedAPI } from '../../apiservices/allAPI';

function AllCalender() {
  const [calenderData,setCalenderData] = useState([])
    const handleProtectedCheck = async()=>{
        const token = localStorage.getItem("token")
        // console.log(token);
        if(!token){
          navigate("/")
        }else{
          const reqHeader = {"x-access-token":token}
          const result = await protectedAPI(reqHeader)
        //   console.log(result); 
          if(result.status!==200){
            navigate("/")
          }
        }
      }

      const getCalenderEvents = async () => {
        try {
         const  reqHeader = {"x-access-token":localStorage.getItem("token")}
         const result = await getCalenderEventsAPI(reqHeader)
         if(result.status===200){
           setCalenderData(result.data);
           console.log(result.data);
         }
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
        handleProtectedCheck()
        getCalenderEvents()
      },[])

      const handleDelete = async(id)=>{
        console.log(id);
        try{
          const reqHeader = {"x-access-token":localStorage.getItem("token")}
          const result = await deleteCalenderEventsAPI(id,reqHeader)
          if(result.status===200){
            toast.success("Deleted Successfully")
            getCalenderEvents()
            console.log(result);
          }else{
            toast.error(result.response.data.message)
          }
        }catch(error){
          console.log(error);
        }
      }
  return (
    <div className="lg:flex">
      <Sidebar/>
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-8 text-center">All Calender Events</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-collapse   border-gray-400  rounded-lg overflow-x-auto">
              <thead>
                <tr >
                  <th className="border border-gray-400  px-4 py-2 ">Title</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Description</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Date</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center   bg-gray-300">
                {calenderData?.length>0 ?
                calenderData.map((calender,index)=>(
                    <tr key={index} className='border border-gray-400'>
                    <td className="border  border-gray-400  px-4 py-2">{calender?.title}</td>
                    <td className="border  border-gray-400   px-4 py-2">{calender?.description}</td>
                    <td className="border  border-gray-400   px-4 py-2">{calender?.date}</td>
                    <td className="border  border-gray-400    px-4 py-2">
                    <button onClick={()=>handleDelete(calender._id)} type='button' className="text-red-600 ms-6">
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

export default AllCalender
