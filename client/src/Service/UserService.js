import axiosInstance from "./axiosInstance.js";

export const addUser = async (user) => {
    return await axiosInstance.post('/api/v1.0/admin/register', user);
}

export const deleteUser = async (id) => {
    return await axiosInstance.delete(`/api/v1.0/admin/users/${id}`);
}

export const fetchUsers = async () => {
    return await axiosInstance.get('/api/v1.0/admin/users');
}