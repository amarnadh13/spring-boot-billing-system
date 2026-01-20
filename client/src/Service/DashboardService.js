import API_URL from "./axiosInstance.js";

export const fetchDashboardData = async () => {
    return await API_URL.get('/dashboard');
}