import axiosInstance from "./axiosInstance.js";

export const addItem = async (item) => {
    return await axiosInstance.post('/api/v1.0/admin/items', item);
}

export const deleteItem = async (itemId) => {
    return await axiosInstance.delete(`/api/v1.0/admin/items/${itemId}`);
}

export const fetchItems = async () => {
    return await axiosInstance.get('/api/v1.0/items');
}