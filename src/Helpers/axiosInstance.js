import axios from 'axios';

const BASE_URL='https://lms-backend-production-0117.up.railway.app/api/v1';

// const BASE_URL='http://localhost:8000/api/v1'
const axiosInstance=axios.create();

axiosInstance.defaults.baseURL=BASE_URL;
axiosInstance.defaults.withCredentials=true;


export default axiosInstance;