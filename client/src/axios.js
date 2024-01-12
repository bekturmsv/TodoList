import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const axiosBaseUrl = axios.create({
  baseURL: apiUrl,
});

axiosBaseUrl.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default axiosBaseUrl;
