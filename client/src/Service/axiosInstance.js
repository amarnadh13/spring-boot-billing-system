import axios from "axios";

const API_URL = axios.create({
    baseURL: "https://spring-boot-billing-system.onrender.com/api/v1.0"
});

API_URL.interceptors.request.use(config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

API_URL.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
        return Promise.reject(error);
    }
);

export default API_URL;