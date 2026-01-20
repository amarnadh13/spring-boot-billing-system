import API_URL from "./axiosInstance.js";

export const addUser = async (user) => {
    return await API_URL.post('/admin/register', user);
}

export const deleteUser = async (id) => {
    return await API_URL.delete(`/admin/users/${id}`);
}

export const fetchUsers = async () => {
    return await API_URL.get('/admin/users');
}