import API_URL from "./axiosInstance.js";

export const addCategory = async (category) => {
    return await API_URL.post("/admin/categories", category);
}
export const deleteCategory = async (categoryId) => {
    return await API_URL.delete(`/admin/categories/${categoryId}`);
}
export const fetchCategories = async () => {
    return await API_URL.get("/categories");
}