import axios from "axios"
import { baseUrl } from "../common/apiSummary"
const getAccessKey=()=>{
   return localStorage.getItem("access_token")
}
export const axiosPrivate=axios.create({
    baseURL:baseUrl,
    withCredentials:true,
})


axiosPrivate.interceptors.request.use(
  (config) => {
    const token = getAccessKey();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);