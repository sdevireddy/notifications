import axios from "axios"
import { baseUrl } from "../common/apiSummary"

export const axiosPrivate=axios.create({
    baseURL:baseUrl,
    withCredentials:true
})