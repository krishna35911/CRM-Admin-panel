import React, { useEffect, useState } from 'react'
import { addCalenderAPI, protectedAPI } from '../../apiservices/allAPI';
import Sidebar from '../../components/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card,Input,Button, Typography,Textarea,} from "@material-tailwind/react";

function AddCalender() {
    const[addcalender,setaddcalender]=useState({
        title:"",
        description:"",
        date:""
    })
    console.log(addcalender);
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
      useEffect(()=>
    {
        handleProtectedCheck()
    },[])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const{title,description,date}=addcalender
        try {
            const reqHeader = {"x-access-token":localStorage.getItem("token")}
            const res=await addCalenderAPI({title,description,date},reqHeader)
            if(res.status===200){
                toast.success("Calender Added Successfully")
                setaddcalender({
                    title:"",
                    description:"",
                    date:""
                })
                // console.log(res);
            }else{
                toast.error(res.response.data.error)
            }
        }
        catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='lg:flex'>
        <Sidebar />
        <div className=' flex flex-col items-center w-[100%] h-screen lg:h-auto  '>
          <Card color="transparent" shadow={false}>
            <Typography variant="h3" color="blue-gray" className='mt-8'>
              Add Calender
            </Typography>

            <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-3">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Title
                </Typography>
                <Input
                  value={addcalender.title}
                  onChange={e => setaddcalender({ ...addcalender, title: e.target.value })}
                  size="lg"
                  type='text'
                  placeholder="Add Title"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Description
                </Typography>
                <Textarea
                  value={addcalender.description}
                  onChange={e => setaddcalender({ ...addcalender, description: e.target.value })}
                  size="lg"
                  placeholder="Add Description"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Date
                </Typography>
                <Input
                  value={addcalender.date}
                  onChange={e => setaddcalender({ ...addcalender, date: e.target.value })}
                  size="lg"
                  type='date'
                  placeholder="Add Date"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>
              <Button type='button' onClick={handleSubmit} className="mt-6 bg-blue-600 text-[16px]" fullWidth>
                Submit
              </Button>
            </form>
          </Card>
        </div>
        <ToastContainer  autoClose={2500} />
      </div>
  )
}

export default AddCalender
