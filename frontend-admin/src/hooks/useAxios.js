import axios from 'axios';

function useAxios() {
    const axiosInstance = axios.create({
        withCredentials: true
    });

    axiosInstance.interceptors.request.use((config) => {
        // Get token from localStorage
        const token = localStorage.getItem('MEntor_admin');
        
        // If token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    });

    axiosInstance.interceptors.response.use(
        (response) => {
            // If the response is successful, return it
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                console.log("User unauthenticated");
                localStorage.removeItem('MEntor_admin');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
    
    return axiosInstance;
}

export default useAxios;