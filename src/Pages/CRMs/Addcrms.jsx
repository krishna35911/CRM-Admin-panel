import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Card, Input, Button, Typography, Textarea, } from "@material-tailwind/react";
import Sidebar from '../../components/Sidebar';
import { addcrmapi, protectedAPI } from '../../apiservices/allAPI';

function Addcrms() {
  const fileInputRefImage = useRef(null);
  const fileInputRefOfferLetter = useRef(null);
  const   fileInputRefProvisionalCertificate = useRef(null);
  const [addcrms, setaddcrms] = useState({
    name: "",
    email: "",
    password: "",
    phone1: "",
    phone2: "",
    whatsapp: "",
    instagram: "",
    address: "",
    guardian_name: "",
    guardian_phone: "",
    dateofBirth: "",
    program: "",
    joingdate: "",
    salary: "",
    image: null,
    idno: "",
    offerLetter: null,
    provisionalCertificate: null,
    assets: []
  })
  console.log(addcrms);
  const[preview,setPreview] = useState("")

  const handleProtectedCheck = async () => {
    const token = localStorage.getItem("token")
    console.log(token);
    if (!token) {
      navigate("/")
    } else {
      const reqHeader = { "x-access-token": token }
      const result = await protectedAPI(reqHeader)
      if (result.status !== 200) {
        navigate("/")
      }
    }
  }

  const handleAssets = (selectedAsset) => {
    // if selectedAsset not already exists in the assets, add it
    if (!addcrms.assets.includes(selectedAsset)) {
      setaddcrms({ ...addcrms, assets: [...addcrms.assets, selectedAsset] })
    } else {
      setaddcrms({ ...addcrms, assets: addcrms.assets.filter(asset => asset !== selectedAsset) })
    }
  }


  useEffect(() => {
    handleProtectedCheck()
  }, [])
  useEffect(() => {
    handleProtectedCheck()
    if(addcrms.image){
      setPreview(URL.createObjectURL(addcrms.image))
    }
    else{
      setPreview("")
    }
  },[addcrms.image,addcrms.assets])
    console.log(preview);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const reqBody = new FormData()
      reqBody.append("name", addcrms.name)
      reqBody.append("email", addcrms.email)
      reqBody.append("password", addcrms.password)
      reqBody.append("phone1", addcrms.phone1)
      reqBody.append("phone2", addcrms.phone2)
      reqBody.append("whatsapp", addcrms.whatsapp)
      reqBody.append("instagram", addcrms.instagram)
      reqBody.append("address", addcrms.address)
      reqBody.append("guardian_name", addcrms.guardian_name)
      reqBody.append("guardian_phone", addcrms.guardian_phone)
      reqBody.append("dateofBirth", addcrms.dateofBirth)
      reqBody.append("program", addcrms.program)
      reqBody.append("joingdate", addcrms.joingdate)
      reqBody.append("salary", addcrms.salary)
      reqBody.append("image", addcrms.image)
      reqBody.append("idno", addcrms.idno)
      reqBody.append("offerLetter", addcrms.offerLetter)
      reqBody.append("provisionalCertificate", addcrms.provisionalCertificate)
      reqBody.append("assets",JSON.stringify( addcrms.assets))
      const reqHeader = {
       
        "x-access-token": localStorage.getItem("token"),
        "Content-Type": "multipart/form-data"
      }

      const result = await addcrmapi(reqBody,reqHeader)
      console.log(result);

      if (result.status === 200) {
        toast.success("CRM Added Successfully!!!")
        setaddcrms({
          name: "",
          email: "",
          password: "",
          phone1: "",
          phone2: "",
          whatsapp: "",
          instagram: "",
          address: "",
          guardian_name: "",
          guardian_phone: "",
          dateofBirth: "",
          program: "",
          joingdate: "",
          salary: "",
          image: null,
          idno: "",
          offerLetter: null,
          provisionalCertificate: null,
          assets: []  
        })
        setPreview("")
        // Reset the file input value using the ref
        fileInputRef.current.value = ''; // Clear the file input field
        fileInputRefOfferLetter.value = '';
        fileInputRefProvisionalCertificate.value = ''
      } else {
        toast.error(result.response.data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='lg:flex '>
      <Sidebar />

      <div className=' flex flex-col items-center w-[100%] h-screen lg:h-auto '>
        <Card color="transparent" shadow={false}>
          <Typography variant="h3" color="blue-gray" className='mt-8'>
            Add CRM
          </Typography>

          <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-3">
              {/* name */}
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
              {/* email */}
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
                }} />
              {/* password */}
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

              {/* phone1 */}
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Phone 1
              </Typography>
              <Input
                value={addcrms.phone1}
                onChange={e => setaddcrms({ ...addcrms, phone1: e.target.value })}
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
                value={addcrms.phone2}
                onChange={e => setaddcrms({ ...addcrms, phone2: e.target.value })}
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
                value={addcrms.whatsapp}
                onChange={e => setaddcrms({ ...addcrms, whatsapp: e.target.value })}
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
                value={addcrms.instagram}
                onChange={e => setaddcrms({ ...addcrms, instagram: e.target.value })}
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
                value={addcrms.address}
                onChange={e => setaddcrms({ ...addcrms, address: e.target.value })}
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
                value={addcrms.guardian_name}
                onChange={e => setaddcrms({ ...addcrms, guardian_name: e.target.value })}
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
                value={addcrms.guardian_phone}
                onChange={e => setaddcrms({ ...addcrms, guardian_phone: e.target.value })}
                type='text'
                size="lg"
                placeholder="Add Guardian Phone Number"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {/* dateofBirth */}
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
              {/* Program */}
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
              {/* joining date */}
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
              {/* image */}
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Image
              </Typography>
              <input
                ref={fileInputRefImage}
                onChange={e => setaddcrms({ ...addcrms, image: e.target.files[0] })}
                type="file"
                className='w-[100%] text-black file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-gray-900 file:rounded-lg ' />

              {/* ID Number */}
              <Typography variant="h6" color="blue-gray" className="mt-4">
                ID NO
              </Typography>
              <Input
                value={addcrms.idno}
                onChange={e => setaddcrms({ ...addcrms, idno: e.target.value })}
                size="lg"
                type='text'
                placeholder="Add ID Number"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              {/* offerLetter */}
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Offer Letter
              </Typography>
              <input
                ref={fileInputRefOfferLetter}
                onChange={e => setaddcrms({ ...addcrms, offerLetter: e.target.files[0] })}
                type="file"
                className='w-[100%] text-black file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-gray-900 file:rounded-lg ' />

              {/* Provisional Certificate */}
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Provisional Certificate
              </Typography>
              <input
                ref={fileInputRefProvisionalCertificate}
                onChange={e => setaddcrms({ ...addcrms, provisionalCertificate: e.target.files[0] })}
                type="file"
                className='w-[100%] text-black file:py-2 file:px-4 file:border-0 file:text-white file:bg-blue-gray-900 file:rounded-lg ' />

              {/* Assets */}
              <Typography variant="h6" color="blue-gray" className="mt-2">
                Assets
              </Typography>
              <div className='inline-flex gap-2'>
                <label className='text-black'>Laptop</label>
                <input value="Laptop" onChange={() => handleAssets('Laptop')} type="checkbox" />
              </div>
              <div className='inline-flex gap-2'>
                <label className='text-black'>Sim</label>
                <input value="Sim" onChange={() => handleAssets('Sim')} type="checkbox" />
              </div>
              <div className='inline-flex gap-2'>
                <label className='text-black'>Phone</label>
                <input value="Phone" onChange={() => handleAssets('Phone')} type="checkbox" />
              </div>

            </div>
            <Button type='button' onClick={handleSubmit} className="my-6 bg-blue-600 text-[16px]" fullWidth>
              Submit
            </Button>
          </form>
        </Card>
      </div>
      <ToastContainer autoClose={2500} />
    </div>
  )
}

export default Addcrms
