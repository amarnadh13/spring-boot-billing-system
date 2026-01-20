import API_URL from "./axiosInstance.js";

export const latestOrders = async () => {
    return await API_URL.get("/orders/latest");
}

export const createOrder = async (order) => {
    return await API_URL.post("/orders", order);
}

export const deleteOrder = async (orderId) => {
    return await API_URL.delete(`/orders/${orderId}`);
}