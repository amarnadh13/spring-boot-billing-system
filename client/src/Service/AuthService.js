import API_URL from "./axiosInstance.js";

export const login = async (data) => {
    return await API_URL.post("/login", data);
}