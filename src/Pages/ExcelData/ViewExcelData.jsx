import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {deleteallExcelAPI, deleteExcelAPI, getExcelAPI, protectedAPI } from '../../apiservices/allAPI';

function ViewExcelData() {
    const[exceldata,setexceldata]=useState([])
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

      
    
    useEffect(()=>
        {
          handleProtectedCheck()
          getexceldata()
       },[])

       const getexceldata = async () => {
        try {
         const result = await getExcelAPI()
         if(result.status===200){
           console.log(result.data);
        //  i want to display data in the order of serialnumber in ascending order
           const sorteddata = result.data.leads.sort((a,b)=>a.serial_number-b.serial_number)
           setexceldata(sorteddata)
         }
        } catch (error) {
          console.log(error);
        }
      }

      const handleDelete = async(id)=>{
        console.log(id);
        try{
          const reqHeader = {"x-access-token":localStorage.getItem("token")}
          const result = await deleteExcelAPI(id,reqHeader)
          if(result.status===200){
            toast.success("Deleted Successfully")
            getexceldata()
            console.log(result);
          }else{
            toast.error(result.response.data.message)
          }
        }catch(error){
          console.log(error);
        }
      }

      const handleDeleteall = async()=>{
        try{
            const reqHeader = {"x-access-token":localStorage.getItem("token")}
            const result = await deleteallExcelAPI(reqHeader)
            if(result.status===200){
              toast.success("Deleted Successfully")
              getexceldata()
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
          <h1 className="text-3xl font-bold mb-8 text-center">All Excel Data</h1>
          <button onClick={handleDeleteall} type='button' className="text-white p-2 rounded mb-6 ms-6 bg-red-400">
                      Delete all data
                      </button>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-collapse   border-gray-400  rounded-lg overflow-x-auto">
              <thead>
                <tr >
                  <th className="border border-gray-400  px-4 py-2 ">Serial Number</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Name</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Email</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Phone Number</th>
                  <th className="border  border-gray-400   px-4 py-2 ">City</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Excel Type</th>
                  <th className="border  border-gray-400   px-4 py-2 ">CRM Name</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center   bg-gray-300">
                {exceldata?.length>0 ?
                exceldata.map((data,index)=>(
                    <tr key={index} className='border border-gray-400'>
                    <td className="border  border-gray-400  px-4 py-2">{data?.serial_number}</td>
                    <td className="border  border-gray-400   px-4 py-2">{data?.name}</td>
                    <td className="border  border-gray-400   px-4 py-2">{data?.email}</td>
                    <td className="border  border-gray-400   px-4 py-2">{data?.phone_number}</td>
                    <td className="border  border-gray-400   px-4 py-2">{data?.city}</td>
                    <td className="border  border-gray-400   px-4 py-2">{data?.excel_type}</td>
                    <td className="border  border-gray-400   px-4 py-2">{data?.uploaded_crm_name}</td>
                    <td className="border  border-gray-400    px-4 py-2">
                    <button onClick={()=>handleDelete(data._id)} type='button' className="text-red-600 ms-6">
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

export default ViewExcelData
