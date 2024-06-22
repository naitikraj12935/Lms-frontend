import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    key: "rzp_test_y595riQBCfFEvo",
    Ysubscription_id: "",
    Msubscription_id: "",
    isPaymentVerified: false,
    allPayments: {},
    finalMonths: {},
    monthlySalesRecord: []
};

// Fetch RazorPay Key
export const getRazorPayId = createAsyncThunk("/razorpay/getId", async () => {
    try {
        const response = await axiosInstance.get("/payments/razorpay-key");
        return response.data;
    } catch (error) {
        toast.error("Failed to load data");
        throw error;
    }
});

// Purchase Yearly Course Bundle
export const purchaseCourseBundleY = createAsyncThunk("/purchaseCourse/Y", async () => {
    try {
        const response = await axiosInstance.post("/payments/Ysubscribe");
        console.log(response);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});

// Purchase Monthly Course Bundle
export const purchaseCourseBundleM = createAsyncThunk("/purchaseCourse/M", async () => {
    try {
        const response = await axiosInstance.post("/payments/Msubscribe");
        console.log(response);
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});

// Verify User Payment
export const verifyUserPayment = createAsyncThunk("/payments/verify", async (data) => {
    try {
        const response = await axiosInstance.post("/payments/verify", {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        });
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});

// Get Payment Records
export const getPaymentRecord = createAsyncThunk("/payments/record", async () => {
    try {
        const response = axiosInstance.get("/payments?count=100");
        toast.promise(response, {
            loading: "Getting the payment records",
            success: (data) => data?.data?.message,
            error: "Failed to get payment records"
        });
        return (await response).data;
    } catch (error) {
        toast.error("Operation failed");
        throw error;
    }
});

// Cancel Course Bundle
export const cancelCourseBundle = createAsyncThunk("/payments/cancel", async () => {
    try {
        const response = axiosInstance.post("/payments/unsubscribe");
        toast.promise(response, {
            loading: "Unsubscribing the bundle",
            success: (data) => data?.data?.message,
            error: "Failed to unsubscribe"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error;
    }
});

// Create the Razorpay Slice
const razorpaySlice = createSlice({
    name: "razorpay",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRazorPayId.fulfilled, (state, action) => {
                state.key = action.payload.key;
            })
            .addCase(purchaseCourseBundleY.fulfilled, (state, action) => {
                state.Ysubscription_id = action.payload.subscription_id;
            })
            .addCase(purchaseCourseBundleM.fulfilled, (state, action) => {
                state.Msubscription_id = action.payload.subscription_id;
            })
            .addCase(verifyUserPayment.fulfilled, (state, action) => {
                toast.success(action.payload.message);
                state.isPaymentVerified = action.payload.success;
            })
            .addCase(verifyUserPayment.rejected, (state, action) => {
                toast.error(action.error.message);
            })
            .addCase(getPaymentRecord.fulfilled, (state, action) => {
                state.allPayments = action.payload.allPayments;
                state.finalMonths = action.payload.finalMonths;
                state.monthlySalesRecord = action.payload.monthlySalesRecord;
            });
    }
});

export default razorpaySlice.reducer;