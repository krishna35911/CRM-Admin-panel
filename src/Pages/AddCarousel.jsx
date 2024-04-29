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

export default AddCarousel
