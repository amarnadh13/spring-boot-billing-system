import axiosInstance from "./axiosInstance.js";

export const addCategory = async (category) => {
    return await axiosInstance.post('/api/v1.0/admin/categories', category);
}
export const deleteCategory = async (categoryId) => {
    return await axiosInstance.delete(`/api/v1.0/admin/categories/${categoryId}`);
}
export const fetchCategories = async () => {
    return await axiosInstance.get('/api/v1.0');
}