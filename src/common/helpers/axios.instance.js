import axios from "axios"
import parseJson from "./parseJson"
const axiosInstance = axios.create();


axiosInstance.interceptors.request.use(
    async (config) => {
        config.headers = {
            Authorization: `Bearer ${parseJson(localStorage.getItem("user"))?.accessToken}`,
        };
        config.baseURL= 'http://localhost:3001';
        
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosInstance;