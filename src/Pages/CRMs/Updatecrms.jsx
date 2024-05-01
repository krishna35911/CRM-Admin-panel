import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Card,Input,Button, Typography,} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { getCrmsAPI, protectedAPI, updatecrmapi } from '../../apiservices/allAPI';
// import { setTimeout } from 'timers/promises';

function Updatecrms() {
  const {id}=useParams()
  console.log(id);
const [getCrmData,setGetCrmData] = useState([])
const [crmData,setCrmData]=useState({
  phoneno:"",
salary:"",
program:"",
image:""
})
// single id
const getid=async()=>{
  try{
    const reqHeader = {"x-access-token":localStorage.getItem("token")}
    const result = await getCrmsAPI(reqHeader)
    console.log(result.data);
const crm= result.data.find((crm)=>crm._id===id)
// setGetCrmData(crm)
setCrmData({
  phoneno:crm.phoneno,
  salary:crm.salary,
  program:crm.program,
  image:crm.image
})
console.log("jo",crmData);

// console.log("single id",getCrmData);
  }catch(error){
    console.log(error);
  }
}
// 
//image
const handleFileChange = (e) =>{
  const file = e.target.files[0]
  if(file){
    setCrmData({...crmData,image:file})
  }
}
console.log(crmData);
//


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
const handleUpdate = async(e)=>{
  e.preventDefault()
  try {
    const reqBody = new FormData()
    reqBody.append("phoneno",crmData.phoneno)
    reqBody.append("salary",crmData.salary)
    reqBody.append("program",crmData.program)
    reqBody.append("image",crmData.image)

    const reqheader= {"x-access-token":localStorage.getItem("token")}
    const result= await updatecrmapi(id,reqBody,reqheader)
    console.log("resultis",result);
    if(result.status===200){
toast.success(result.data.message)
setTimeout(() => {
  navigate("/all-crms")
},3000) 
setCrmData({
  phoneno:"",
  salary:"",
  program:"",
  image:""
})
    }else{
      toast.error(result.response.data.error)
    }
  }catch (error) {
    console.log(error);
  }
}
useEffect(() => {
  handleProtectedCheck()
getid()
},[])

  return (
    <div className='lg:flex '>
    <Sidebar />
    <div className=' flex flex-col items-center w-[100%] h-screen lg:h-auto  '>
      <Card color="transparent" shadow={false}>
        <Typography variant="h3" color="blue-gray" className='mt-8'>
          EDIT CRM
        </Typography>

        <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-3">
            {/* <Typography variant="h6" color="blue-gray" className="mb-2">
              Name
            </Typography> */}
            {/* <Input
              type='text'
              size="lg"
              placeholder="Add name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            /> */}
            {/* <Typography variant="h6" color="blue-gray" className="mb-2">
              Email
            </Typography> */}
            {/* <Input
              size="lg"
              type='email'
              placeholder="Add email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            /> */}
            {/* <Typography variant="h6" color="blue-gray" className="mb-2">
              Password
            </Typography>
            <Input
              size="lg"
              type='password'
              placeholder="Add Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            /> */}
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Phone Number
            </Typography>
            <Input
            value={crmData.phoneno}
             onChange={e => setCrmData({ ...crmData, phoneno: e.target.value })}

              size="lg"
              type='number'
              placeholder="Add Phone Number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {/* <Typography variant="h6" color="blue-gray" className="mb-2">
              Date of Birth
            </Typography>
            <Input
              size="lg"
              type='date'
              placeholder="Add Date of Birth"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            /> */}

            <Typography variant="h6" color="blue-gray" className="mb-2">
              Program
            </Typography>
            <select id="countries" class="wid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={crmData.program}
              onChange={e => setCrmData({ ...crmData, program: e.target.value })}
 
            >
                <option selected>Choose a program</option>
                <option value="Ausbildung">Ausbildung</option>
                <option value="Nursing">Nursing</option>
                <option value="Drivers">Drivers</option>
                <option value="Other">Other Professionals</option>
            </select>
            {/* <Typography variant="h6" color="blue-gray" className="mb-2">
              Guardian
            </Typography>
            <Input
              size="lg"
              type='text'
              placeholder="Add Guardian"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            /> */}
            {/* <Typography variant="h6" color="blue-gray" className="mb-2">
              Joining Date
            </Typography>
            <Input
              size="lg"
              type='date'
              placeholder="Add Joining date"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            /> */}
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Salary
            </Typography>
            <Input
              value={crmData.salary}
              onChange={e => setCrmData({ ...crmData, salary: e.target.value })}
 
              size="lg"
              type='number'
              placeholder="Add Salary"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Image
            </Typography>
            <input
            onChange={handleFileChange}
              type="file"
              className='w-[100%] text-black file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-gray-900 file:rounded-lg ' />
          </div>
          <Button type='button' onClick={handleUpdate}  className="mt-6 bg-blue-600 text-[16px]" fullWidth>


            Submit
          </Button>
        </form>
      </Card>
    </div>
    <ToastContainer  autoClose={2500} />
  </div>
  )
}

export default Updatecrms
