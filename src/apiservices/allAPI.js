import { commonAPI } from "./commonAPI"
import SERVER_URL from "./serverUrl"


// Admin login
export const loginAPI = async (reqBody)=>{
    return await commonAPI('POST',`${SERVER_URL}/api/admin/login`,reqBody,"")
}
// add carousal
export const addCarousalAPI = async (reqBody,reqHeader) => {
    return await commonAPI('POST',`${SERVER_URL}/api/admin/addCarousel`,reqBody,reqHeader)
}