import axiosInstance from "./axiosInstance.js";

export const latestOrders = async () => {
    return await axiosInstance.get("/api/v1.0/orders/latest");
}

export const createOrder = async (order) => {
    return await axiosInstance.post("/api/v1.0/orders", order);
}

export const deleteOrder = async (orderId) => {
    return await axiosInstance.delete(`/api/v1.0/orders/${orderId}`);
}