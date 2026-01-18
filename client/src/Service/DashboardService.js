import axiosInstance from "./axiosInstance.js";

export const fetchDashboardData = async () => {
    return await axiosInstance.get('/api/v1.0/dashboard');
}