import axios from "axios";
import { BASE_URL } from "./constants";


export const axiosObj = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})
