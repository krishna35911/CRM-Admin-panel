import React, { useEffect, useRef, useState } from 'react'
  import Sidebar from '../components/Sidebar'
  import { Card,Input,Button, Typography,Textarea,} from "@material-tailwind/react";
  import { useNavigate, useParams } from 'react-router-dom';
  import {   editCarousalAPI, getSingleCarousalByIdAPI, protectedAPI } from '../apiservices/allAPI';
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function EditCarousal() {
    const {id} =  useParams()
    console.log(id);
    const fileInputRef = useRef(null)
    const [preview,setPreview] = useState("")
    const navigate = useNavigate()
    const [addCarousel, setAddCarousal] = useState({
      title: "",
      description: "",
      link: "",
      image: ""
    })


    // console.log(addCarousel)

    // get single carousal data
    const getSingleCarousal = async()=>{
        const reqHeader = {
          "x-access-token":localStorage.getItem("token")
        }
        const result = await getSingleCarousalByIdAPI(id,reqHeader)
        setAddCarousal({
          title: result.data.title,
          description: result.data.description,
          link: result.data.link,
          image: result.data.image
        });

    }
    const handleFileChange = (e) =>{
      const file = e.target.files[0]
      if(file){
        setAddCarousal({...addCarousel,image:file})
        setPreview(URL.createObjectURL(file))
      }
    }
    const handleUpdate = async(e)=>{
      e.preventDefault()
      try {
        const reqBody = new FormData()
        reqBody.append("title",addCarousel.title)
        reqBody.append("description",addCarousel.description)
        reqBody.append("link",addCarousel.link)
        reqBody.append("image",addCarousel.image)

        const reqHeader = {"x-access-token":localStorage.getItem("token")}
        const result = await editCarousalAPI(id,reqBody,reqHeader)
        console.log(result);
        if(result.status===200){
          toast.success(result.data.message)
          setTimeout(() => {
            navigate("/all-carousel")
          },3000) 
          setAddCarousal({
            title: "",
            description: "",
            link: "",
            image: ""
          })
          setPreview("")

        }else{
          toast.error(result.response.data.message)
        }
      } catch (error) {
        console.log(error);
      }

    }

    console.log(addCarousel);
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
        getSingleCarousal()
      },[])
      // useEffect(() => {
      //   if(addCarousel.image){
      //     setPreview(URL.createObjectURL(addCarousel.image))
      //   }else{
      //     setPreview("")
      //   }
      // },[addCarousel.image])




  return (
    <div className='lg:flex lg:h-screen sm:lg-auto'>
        <Sidebar />
        <div className=' border flex flex-col items-center w-[100%] h-screen lg:h-auto '>
          <Card color="transparent" shadow={false}>
            <Typography variant="h3" color="blue-gray" className='mt-8'>
              Edit Carousal
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
                  onChange={handleFileChange}
                  type="file"
                  className='w-[100%] text-black file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-gray-900 file:rounded-lg ' />
              </div>
              <Button type='button' onClick={handleUpdate} className="mt-6 bg-blue-600 text-[16px]" fullWidth>
                Submit
              </Button>
            </form>
          </Card>
        </div>
        <ToastContainer  autoClose={2500} />
      </div>
  )
}

export default EditCarousal