import axiosInstance from "./axiosInstance.js";


export const createRazorpayOrder = async (data) => {
    return await axiosInstance.post("/api/v1.0/payments/create-order", data);
}

export const verifyPayment = async (paymentData) => {
    return await axiosInstance.post("/api/v1.0/payments/verify", paymentData);
}