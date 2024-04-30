import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getacrouselapi, protectedAPI } from '../apiservices/allAPI';

function Viewcarousel() {
  const [carousels, setCarousels] = useState([]);

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

    useEffect(() => {
      handleProtectedCheck()
      getcarousels()
    },[])
    
    const getcarousels = async () => {
      try {
        const reqHeader = {"x-access-token":localStorage.getItem("token")}
        const res=await getacrouselapi(reqHeader)
        if(res.status===200){
          setCarousels(res.data);
          console.log(res.data);
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
          <h1 className="text-3xl font-bold mb-8 text-center">All Carousals</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg overflow-x-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Image</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {carousels?.map((carousel) => (
                  <tr key={carousel.id}>
                    <td className="border px-4 py-2">{carousel?.title}</td>
                    <td className="border px-4 py-2">{carousel?.description}</td>
                    <td className="border px-4 py-2">
                      <img src={carousel?.image} alt={carousel.title} className="w-16 h-16 object-cover" />
                    </td>
                    <td className="border px-4 py-2">
                      <button className="text-blue-800 ">
                      <i class="fa-solid fa-pen"></i>
                      </button>
                      <button className="text-red-600 ms-6">
                      <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
    </div>
  );
}

export default Viewcarousel;
