import axios from 'axios';


export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  const MEntorToken = localStorage.getItem('MEntor_token');
  if (MEntorToken) {
    config.headers.Authorization = `Bearer ${MEntorToken}`;
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
      console.log("user unauthenticated")
      localStorage.clear()
      window.location.href = '/auth/login';
    }
    if (error.response && error.response.status === 403) {
      console.log("user blocked")
      window.location.href = '/auth/blocked';
    }
    return Promise.reject(error);
  }
);

