import { commonAPI } from "./commonAPI"
import SERVER_URL from "./serverUrl"


// Admin login
export const loginAPI = async (reqBody)=>{
    return await commonAPI('POST',`${SERVER_URL}/api/admin/login`,reqBody,"")
}

// protected
export const protectedAPI = async (reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/api/admin/protected`,"",reqHeader)
}
// add carousal
export const addCarousalAPI = async (reqBody,reqHeader) => {
    return await commonAPI('POST',`${SERVER_URL}/api/admin/addCarousel`,reqBody,reqHeader)
}

export const getacrouselapi = async (reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/api/admin/getCarousel`,"",reqHeader)
}

export const getSingleCarousalByIdAPI = async (id,reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/api/admin/get-carousel-by-id/${id}`,"",reqHeader)
}
export const editCarousalAPI = async (id,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${SERVER_URL}/api/admin/updateCarousel/${id}`,reqBody,reqHeader)
}

//delete carousel
export const deleteacrouselapi = async (id,reqHeader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/api/admin/deleteCarousel/${id}`,"",reqHeader)
}

export const getCrmsAPI = async (reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/api/admin/get-crms`,"",reqHeader)
}

export const deleteCrmAPI = async (id,reqHeader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/api/admin/delete-crms/${id}`,"",reqHeader)
}

// add crm
export const addcrmapi = async (reqBody,reqHeader) => {
    return await commonAPI('POST',`${SERVER_URL}/api/admin/add-crms`,reqBody,reqHeader)
}

//updatecrm
export const updatecrmapi=async (id,reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${SERVER_URL}/api/admin/updateCrm/${id}`,reqBody,reqHeader)
}

// add calender
export const addCalenderAPI = async (reqBody,reqHeader) => {
    return await commonAPI('POST',`${SERVER_URL}/api/admin/add-calender-events`,reqBody,reqHeader)
}

// get calender Events
export const getCalenderEventsAPI = async (reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/api/admin/get-calender`,"",reqHeader)
}

// get calender Events
export const deleteCalenderEventsAPI = async (id,reqHeader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/api/admin/delete-calender-events/${id}`,"",reqHeader)
}

//get leaves
export const getleavesAPI=async(reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/api/admin/get-leaves`,"",reqHeader)
}

//upload excel file
export const addExcelAPI=async(reqBody,reqHeader)=>{
    return await commonAPI('POST',`${SERVER_URL}/api/admin/add-leads`,reqBody,reqHeader)
}

//get excel data
export const getExcelAPI=async()=>{
    return await commonAPI('GET',`${SERVER_URL}/api/admin/get-all-leads`,"")
}

// delete excel data
export const deleteExcelAPI = async (id,reqHeader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/api/admin/delete-leads/${id}`,"",reqHeader)
}

// delete all excel data
export const deleteallExcelAPI = async (reqHeader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/api/admin/delete-all-leads`,"",reqHeader)
}
