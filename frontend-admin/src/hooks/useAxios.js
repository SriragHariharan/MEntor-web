import axios from 'axios';

function useAxios() {
    
    const axiosInstance = axios.create({
        withCredentials: true
    });

    axiosInstance.interceptors.request.use((config) => {
    return config;
    });

    axiosInstance.interceptors.response.use(
    (response) => {
        // If the response is successful, return it
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log("user unauthenticated")
            localStorage.removeItem('MEntor_admin')
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
    );
  return axiosInstance;
}

export default useAxios