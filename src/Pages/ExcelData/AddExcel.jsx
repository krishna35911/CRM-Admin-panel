import React, { useEffect, useRef, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Card,Input,Button, Typography} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addExcelAPI, protectedAPI } from '../../apiservices/allAPI';
import { useNavigate } from 'react-router-dom';

function AddExcel() {
    const fileInputRef = useRef(null)
    const navigate=useNavigate()
    const[addexcel,setaddexcel]=useState({
        excel:"",
        excel_type:""
    })
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
  },[])
    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("excel",addexcel.excel)
        formData.append("excel_type",addexcel.excel_type)
        const reqHeader = {"x-access-token":localStorage.getItem("token")}
        try {
          const res=await addExcelAPI(formData,reqHeader)
          if(res.status===200){
            console.log(res);
            toast.success("Excel uploaded successfully")
            navigate("/all-excel-data")
            setaddexcel({
              excel:"",
              excel_type:""
            })}
            fileInputRef.current.value = '';

        } catch (error) {
          toast.error("Failed to upload file")
          // console.log(error);
        }
    }
  return (
   
    <div className='lg:flex'>
    <Sidebar />
    <div className=' flex flex-col items-center w-[100%] h-screen lg:h-auto  '>
      <Card color="transparent" shadow={false}>
        <Typography variant="h3" color="blue-gray" className='mt-8'>
          Add Excel File
        </Typography>

        <form className="mt-10 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              File
            </Typography>
            <input
              ref={fileInputRef}
              onChange={e => setaddexcel({ ...addexcel, excel: e.target.files[0] })}
              type="file"
              className='w-[100%] text-black file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-gray-900 file:rounded-lg ' />

            
            <Typography variant="h6" color="blue-gray" className="mb-2 mt-10">
              Program
            </Typography>
            <select id="countries" class="wid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={addexcel.excel_type} onChange={e => setaddexcel({ ...addexcel, excel_type: e.target.value })}>
                <option selected>Choose a type</option>
                <option value="Ausbildung">Ausbildung</option>
                <option value="Nursing">Nursing</option>
                <option value="Drivers">Drivers</option>
                <option value="Other">Other Professionals</option>
            </select>
          </div>
         
        </form>
      </Card>
      <Button type='button' onClick={handleSubmit} className="mt-6 bg-blue-600 text-[16px]" >
            Submit
          </Button>
    </div>
    <ToastContainer  autoClose={2500} />
  </div>
  )
}

export default AddExcel
