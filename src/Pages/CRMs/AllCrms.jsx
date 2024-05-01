import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteCrmAPI, getCrmsAPI, protectedAPI } from '../../apiservices/allAPI';


function AllCrms() {
    const [getCrmData,setGetCrmData] = useState([])
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

      useEffect(() => {
        handleProtectedCheck()
        getCrms()
      },[])
      
      const getCrms = async () => {
        try {
          const reqHeader = {"x-access-token":localStorage.getItem("token")}
          const res=await getCrmsAPI(reqHeader)
          if(res.status===200){
            // setCarousels(res.data);
            setGetCrmData(res.data)
            // console.log(res.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    //   console.log(getCrmData);

    //   delete crm function
    const handleDelete = async(id)=>{
        try {
            const reqHeader = {"x-access-token":localStorage.getItem("token")}
            const result = await deleteCrmAPI(id,reqHeader)
            if(result.status===200){
                toast.success("Deleted Successfully")
                getCrms()
            // console.log(result);
            }else{
                toast.error(result.response.data.message)
                // console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="lg:flex">
      <Sidebar />
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-8 text-center">All CRMS</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-collapse   border-gray-400  rounded-lg overflow-x-auto">
              <thead>
                <tr >
                  <th className="border border-gray-400  px-4 py-2 ">Name</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Email</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Phone</th>
                  <th className="border  border-gray-400   px-4 py-2 ">DOB</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Program</th>
                  <th className="border  border-gray-400  px-4 py-2 ">Guardian</th>
                  <th className="border  border-gray-400   px-4 py-2 ">JoiningDate</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Salary</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Image</th>
                  <th className="border  border-gray-400   px-4 py-2 ">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center   bg-gray-300">
                {getCrmData?.length>0 ?
                getCrmData.map((crm,index)=>(
                    <tr key={index} className='border border-gray-400'>
                    <td className="border  border-gray-400  px-4 py-2">{crm?.name}</td>
                    <td className="border  border-gray-400   px-4 py-2">{crm?.email}</td>
                    <td className="border  border-gray-400   px-4 py-2">{crm?.phoneno}</td>
                    <td className="border  border-gray-400   px-4 py-2">{crm?.dateofBirth}</td>
                    <td className="border  border-gray-400   px-4 py-2">{crm?.program}</td>
                    <td className="border  border-gray-400   px-4 py-2">{crm?.guardian}</td>
                    <td className="border  border-gray-400   px-4 py-2">{crm?.joingdate}</td>
                    <td className="border  border-gray-400   px-4 py-2">{crm?.salary}</td>
                    <td className="border  border-gray-400    px-4 py-2">
                      <img src={crm?.image} alt={crm?.title} className="w-16 h-16 object-cover mx-auto" />
                    </td>
                    <td className="border  border-gray-400    px-4 py-2">
                      <Link  className="text-blue-800 ">
                      <i class="fa-solid fa-pen"></i>
                      </Link>

                      <button onClick={()=>handleDelete(crm._id)} type='button' className="text-red-600 ms-6">
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

export default AllCrms