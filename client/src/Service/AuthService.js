import axiosInstance from "./axiosInstance.js";

export const login = async (data) => {
    return await axiosInstance.post("/api/v1.0/login", data);
}