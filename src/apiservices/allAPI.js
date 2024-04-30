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