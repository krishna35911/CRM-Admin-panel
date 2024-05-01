import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card,Input,Button, Typography,Textarea,} from "@material-tailwind/react";
import Sidebar from '../../components/Sidebar';
import { addcrmapi, protectedAPI } from '../../apiservices/allAPI';

function Addcrms() {
    const fileInputRef = useRef(null)
    const[addcrms,setaddcrms]=useState({
        name:"",
        email:"",
        password:"",
        phoneno:"",
        dateofBirth:"",
        program:"",
        guardian:"",
        joingdate:"",
        salary:"",
        image:""
    })
    // console.log(addcrms);
    const[preview,setPreview] = useState("")

    const handleProtectedCheck = async()=>{
        const token = localStorage.getItem("token")
        console.log(token);
        if(!token){
          navigate("/")
        }else{
          const reqHeader = {"x-access-token":token}
          const result = await protectedAPI(reqHeader)
          if(result.status!==200){
            navigate("/")
          }
        }
      }

      useEffect(() => {
        handleProtectedCheck()
        if(addcrms.image){
          setPreview(URL.createObjectURL(addcrms.image))
        }else{
          setPreview("")
        }
      },[addcrms.image])
    //   console.log(preview);

      const handleSubmit = async(e)=>{
        e.preventDefault()    
        try {
          const reqBody = new FormData()
          reqBody.append("name",addcrms.name)
          reqBody.append("email",addcrms.email)
          reqBody.append("password",addcrms.password)
          reqBody.append("phoneno",addcrms.phoneno)
          reqBody.append("dateofBirth",addcrms.dateofBirth)
          reqBody.append("program",addcrms.program)
          reqBody.append("guardian",addcrms.guardian)
          reqBody.append("joingdate",addcrms.joingdate)
          reqBody.append("salary",addcrms.salary)
          reqBody.append("image",addcrms.image)
          const reqHeader = {
            "x-access-token":localStorage.getItem("token")
          }
  
          const result = await addcrmapi(reqBody,reqHeader)
        //   console.log(result);
          
          if(result.status === 200){
            toast.success("CRM Added Successfully!!!")
           setaddcrms({
            name: "",
            email: "",
            password: "",
            phoneno: "",
            dateofBirth: "",
            program: "",
            guardian: "",
            joingdate: "",
            salary: "",
            image: ""
           })
            setPreview("")
             // Reset the file input value using the ref
              fileInputRef.current.value = ''; // Clear the file input field
          }else{
            toast.error(result.response.data.message)
          }
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <div className='lg:flex '>
    <Sidebar />
    <div className=' flex flex-col items-center w-[100%] h-screen lg:h-auto  '>
      <Card color="transparent" shadow={false}>
        <Typography variant="h3" color="blue-gray" className='mt-8'>
          Add CRM
        </Typography>

        <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-3">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Name
            </Typography>
            <Input
              value={addcrms.name}
              onChange={e => setaddcrms({ ...addcrms, name: e.target.value })}
              type='text'
              size="lg"
              placeholder="Add name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Email
            </Typography>
            <Input
              value={addcrms.email}
              onChange={e => setaddcrms({ ...addcrms, email: e.target.value })}
              size="lg"
              type='email'
              placeholder="Add email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Password
            </Typography>
            <Input
              value={addcrms.password}
              onChange={e => setaddcrms({ ...addcrms, password: e.target.value })}
              size="lg"
              type='password'
              placeholder="Add Password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Phone Number
            </Typography>
            <Input
              value={addcrms.phoneno}
              onChange={e => setaddcrms({ ...addcrms, phoneno: e.target.value })}
              size="lg"
              type='number'
              placeholder="Add Phone Number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Date of Birth
            </Typography>
            <Input
              value={addcrms.dateofBirth}
              onChange={e => setaddcrms({ ...addcrms, dateofBirth: e.target.value })}
              size="lg"
              type='date'
              placeholder="Add Date of Birth"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="blue-gray" className="mb-2">
              Program
            </Typography>
            <select id="countries" class="wid border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={addcrms.program} onChange={e => setaddcrms({ ...addcrms, program: e.target.value })}>
                <option selected>Choose a program</option>
                <option value="Ausbildung">Ausbildung</option>
                <option value="Nursing">Nursing</option>
                <option value="Drivers">Drivers</option>
                <option value="Other">Other Professionals</option>
            </select>
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Guardian
            </Typography>
            <Input
              value={addcrms.guardian}
              onChange={e => setaddcrms({ ...addcrms, guardian: e.target.value })}
              size="lg"
              type='text'
              placeholder="Add Guardian"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Joining Date
            </Typography>
            <Input
              value={addcrms.joingdate}
              onChange={e => setaddcrms({ ...addcrms, joingdate: e.target.value })}
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
              value={addcrms.salary}
              onChange={e => setaddcrms({ ...addcrms, salary: e.target.value })}
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
              ref={fileInputRef}
              onChange={e => setaddcrms({ ...addcrms, image: e.target.files[0] })}
              type="file"
              className='w-[100%] text-black file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-gray-900 file:rounded-lg ' />
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

export default Addcrms
