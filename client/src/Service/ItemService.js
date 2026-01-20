import API_URL from "./axiosInstance.js";

export const addItem = async (item) => {
    return await API_URL.post('/admin/items', item);
}

export const deleteItem = async (itemId) => {
    return await API_URL.delete(`/admin/items/${itemId}`);
}

export const fetchItems = async () => {
    return await API_URL.get('/items');
}