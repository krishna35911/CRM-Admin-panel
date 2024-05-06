import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { Card,Input,Button, Typography,} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getCrmsAPI, protectedAPI, updatecrmapi } from '../../apiservices/allAPI';
// import { setTimeout } from 'timers/promises';

function Updatecrms() {
  const navigate  = useNavigate()
  const {id}=useParams()
  console.log(id);
const [getCrmData,setGetCrmData] = useState([])
const [crmData,setCrmData]=useState({
    name: "",
    email: "",
    password: "",
    phone1: "",
    phone2: "",
    whatsapp: "",
    instagram: "",
    address: "",
    guardian: [
      {
        guardian_name: "",
        guardian_phone: "",
      }
    ],
    dateofBirth: "",
    program: "",
    joingdate: "",
    salary: "",
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
  name:crm.name,
  email:crm.email,
  password:crm.password,
  phone1:crm.phone1,
  phone2:crm.phone2,
  whatsapp:crm.whatsapp,
  instagram:crm.instagram,
  address:crm.address,
  guardian:[
    {
      guardian_name:crm.guardian[0].guardian_name,
      guardian_phone:crm.guardian[0].guardian_phone
    }
  ],
  dateofBirth:crm.dateofBirth,
  program:crm.program,
  joingdate:crm.joingdate,
  salary:crm.salary
})
console.log("jo",crmData);

// console.log("single id",getCrmData);
  }catch(error){
    console.log(error);
  }
}
// 
//image
// const handleFileChange = (e) =>{
//   const file = e.target.files[0]
//   if(file){
//     setCrmData({...crmData,image:file})
//   }
// }
// console.log(crmData);
// //


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
    // const reqBody = new FormData()
    // reqBody.append("phoneno",crmData.phoneno)
    // reqBody.append("salary",crmData.salary)
    // reqBody.append("program",crmData.program)
    // reqBody.append("image",crmData.image)

    const reqheader= {"x-access-token":localStorage.getItem("token")}
    const result= await updatecrmapi(id,crmData,reqheader)
    console.log("resultis",result.data);
    if(result.status===200){
toast.success(result.data.message)
setTimeout(() => {
 navigate("/view-all-crms")
},3000) 
setCrmData({
  name: "",
    email: "",
    password: "",
    phone1: "",
    phone2: "",
    whatsapp: "",
    instagram: "",
    address: "",
    guardian: [
      {
        guardian_name: "",
        guardian_phone: "",
      }
    ],
    dateofBirth: "",
    program: "",
    joingdate: "",
    salary: "",
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
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Name
            </Typography> 
            <Input
            value={crmData.name}
              onChange={(e) => setCrmData({ ...crmData, name: e.target.value })}
              type='text'
              size="lg"
              placeholder="Add name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}/>

            <Typography variant="h6" color="blue-gray" className="mb-2">
              Email
            </Typography>
             <Input
             value={crmData.email}
              onChange={e => setCrmData({ ...crmData, email: e.target.value })}
              size="lg"
              type='email'
              placeholder="Add email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}/>

              {/* password */}
             <Typography variant="h6" color="blue-gray" className="mb-2">
              Password
            </Typography>
            <Input
            value={crmData.password}
            onChange={e => setCrmData({ ...crmData, password: e.target.value })}
              size="lg"
              type='password'
              placeholder="Add Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            /> 

             {/* phone1 */}
             <Typography variant="h6" color="blue-gray" className="mb-2">
                Phone 1
              </Typography>
              <Input
                value={crmData.phone1}
                onChange={e => setCrmData({ ...crmData, phone1: e.target.value })}
                size="lg"
                type='number'
                placeholder="Add Phone Number 1"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {/* phone2 */}
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Phone 2
              </Typography>
              <Input
                value={crmData.phone2}
                onChange={e => setCrmData({ ...crmData, phone2: e.target.value })}
                size="lg"
                type='number'
                placeholder="Add Phone Number 2"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {/* whatsapp */}
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Whatsapp
              </Typography>
              <Input
                value={crmData.whatsapp}
                onChange={e => setCrmData({ ...crmData, whatsapp: e.target.value })}
                size="lg"
                type='number'
                placeholder="Whatsapp"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {/* instagram */}
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Instagram
              </Typography>
              <Input
                value={crmData.instagram}
                onChange={e => setCrmData({ ...crmData, instagram: e.target.value })}
                size="lg"
                type='text'
                placeholder="Add Your Instagram Link"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {/* address */}
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Address
              </Typography>
              <Input
                value={crmData.address}
                onChange={e => setCrmData({ ...crmData, address: e.target.value })}
                type='text'
                size="lg"
                placeholder="Add Address"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {/* guardian_name */}
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Guardian Name
              </Typography>
              <Input
                value={crmData.guardian[0].guardian_name}
                onChange={e => setCrmData({
                  ...crmData,
                  guardian: [{ ...crmData.guardian[0], guardian_name: e.target.value }]
                })}
                type='text'
                size="lg"
                placeholder="Guardian name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {/* guardian_phone */}
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Guardian Phone Number
              </Typography>
              <Input
                value={crmData.guardian[0].guardian_phone}
                onChange={e => setCrmData({ ...crmData, guardian: [{ ...crmData.guardian[0], guardian_phone: e.target.value }] })}

                type='text'
                size="lg"
                placeholder="Add Guardian Phone Number"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              {/* DOB */}
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Date of Birth
            </Typography>
            <Input
              value={crmData.dateofBirth}
              onChange={e => setCrmData({ ...crmData, dateofBirth: e.target.value })}
              size="lg"
              type='date'
              placeholder="Add Date of Birth"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}/>
            
            {/* program */}
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Program
            </Typography>
            <select id="countries" class="wid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={crmData.program}
              onChange={e => setCrmData({ ...crmData, program: e.target.value })}>
                <option selected>Choose a program</option>
                <option value="Ausbildung">Ausbildung</option>
                <option value="Nursing">Nursing</option>
                <option value="Drivers">Drivers</option>
                <option value="Other">Other Professionals</option>
            </select>

             
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Joining Date
            </Typography>
            <Input
              value={crmData.joingdate}
              onChange={e=> setCrmData({ ...crmData, joingdate: e.target.value })}
              size="lg"
              type='date'
              placeholder="Add Joining date"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            /> 
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
            {/* <Typography variant="h6" color="blue-gray" className="mb-2">
              Image
            </Typography>
            <input
            onChange={handleFileChange}
              type="file"
              className='w-[100%] text-black file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-gray-900 file:rounded-lg ' /> */}
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
