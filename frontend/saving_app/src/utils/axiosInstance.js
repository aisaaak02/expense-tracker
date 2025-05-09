import axios from 'axios';
import { BASE_URL} from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000000,
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

//request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        //const accessToken = localStorage.getItem('token');
        const accessToken = localStorage.getItem('authToken')
        if(accessToken){
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
      // handle common errors globally
      if (error.response && error.response.status === 401) {
        window.location.href = '/login';
      } else if (error.response && error.response.status === 500) {
        console.error('Internal Server Error');
      } else if (error.code === 'ECONNABORTED') {
        console.error('Request Timeout');
      }
      return Promise.reject(error);
    }
  );
  
export default axiosInstance;
