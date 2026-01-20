import API_URL from "./axiosInstance.js";

export const createRazorpayOrder = async (data) => {
    return await API_URL.post("/payments/create-order", data);
}

export const verifyPayment = async (paymentData) => {
    return await API_URL.post("/payments/verify", paymentData);
}