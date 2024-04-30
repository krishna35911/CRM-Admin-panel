import React from 'react'
import Sidebar from '../components/Sidebar'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
    Textarea,
  } from "@material-tailwind/react"; 
  
function AddCarousel() {
  return (
    <div className='lg:flex'>
    <Sidebar/>
    <div className=' border flex flex-col items-center w-[100%] h-screen lg:h-auto  '>
     <Card color="transparent" shadow={false}>
      <Typography variant="h3" color="blue-gray" className='mt-8'>
        Add Carousal
      </Typography>
      
      <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-3">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Title
          </Typography>
          <Input
            size="lg"
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
            size="lg"
            placeholder="Add Description"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Link
          </Typography>
          <Input
            type="text"
            size="lg"
            placeholder="****"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Image
          </Typography>
          <input type="file" className='w-[100%] text-black file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-gray-900 file:rounded-lg ' />
        </div>
        <Button className="mt-6 bg-blue-600 text-[16px]" fullWidth>
          Submit
        </Button>
      </form>
    </Card>


    </div>
    </div>
  )
}
  import React, { useEffect, useRef, useState } from 'react'
  import Sidebar from '../components/Sidebar'
  import { Card,Input,Button, Typography,Textarea,} from "@material-tailwind/react";
  import { useNavigate } from 'react-router-dom';
  import { addCarousalAPI, protectedAPI } from '../apiservices/allAPI';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  function AddCarousel() {
    const fileInputRef = useRef(null)
    const [preview,setPreview] = useState("")
    const navigate = useNavigate()
    const [addCarousel, setAddCarousal] = useState({
      title: "",
      description: "",
      link: "",
      image: ""
    })
    console.log(addCarousel)

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
      if(addCarousel.image){
        setPreview(URL.createObjectURL(addCarousel.image))
      }else{
        setPreview("")
      }
    },[addCarousel.image])

    // add carousal
    const handleSubmit = async(e)=>{
      e.preventDefault()    
      try {
        const reqBody = new FormData()
        reqBody.append("title",addCarousel.title)
        reqBody.append("description",addCarousel.description)
        reqBody.append("link",addCarousel.link)
        reqBody.append("image",addCarousel.image)

        const reqHeader = {
          "x-access-token":localStorage.getItem("token")
        }

        const result = await addCarousalAPI(reqBody,reqHeader)
        console.log(result);
        
        if(result.status === 200){
          toast.success("Carousal Added Successfully!!!")
          setAddCarousal({
            title: "",
            description: "",
            link: "",
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
      <div className='lg:flex'>
        <Sidebar />
        <div className=' border flex flex-col items-center w-[100%] h-screen lg:h-auto bg-gray-300 '>
          <Card color="transparent" shadow={false}>
            <Typography variant="h3" color="blue-gray" className='mt-8'>
              Add Carousal
            </Typography>

            <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-3">
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Title
                </Typography>
                <Input
                  value={addCarousel.title}
                  onChange={e => setAddCarousal({ ...addCarousel, title: e.target.value })}
                  size="lg"
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
                  value={addCarousel.description}
                  onChange={e => setAddCarousal({ ...addCarousel, description: e.target.value })}
                  size="lg"
                  placeholder="Add Description"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="mb-2">
                  Link
                </Typography>
                <Input
                value={addCarousel.link}
                onChange={e=>setAddCarousal({...addCarousel,link:e.target.value})}
                  type="text"
                  size="lg"
                  placeholder="****"
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
                  onChange={e => setAddCarousal({ ...addCarousel, image: e.target.files[0] })}
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

  export default AddCarousel
