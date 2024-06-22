import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast'

import axiosInstance from "../../Helpers/axiosInstance";
const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn') || false,
    role:localStorage.getItem('role') || '',
    data: (() => {
        const data = localStorage.getItem('data');
        return data && data !== 'undefined' ? JSON.parse(data) : {};
    })() }
 export const createAccount=createAsyncThunk("/auth/signup",async(data)=>{
    try {
        const res=axiosInstance.post('user/register',data); 
        toast.promise(res,{
            loading:"wait creating your account",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"failed to create account"

        })
        console.log(res);
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
 })

 export const ForgetPassword=createAsyncThunk("/auth/forgetpassword",async(data)=>{
    try {
        const res=axiosInstance.post('user/forget/password',data); 
        toast.promise(res,{
            loading:"sending email on register email",
            success:"email send successfully",
           

        })
        console.log(res);
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
 })

 export const ResetPassword=createAsyncThunk("/auth/Resetpassword",async(data)=>{
    try {
        const res=axiosInstance.post(`user/reset-password/${data.token}`,data); 
        toast.promise(res,{
            loading:"updating password",
            success:"password updated succesfully",
           

        })
        console.log(res);
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
 })


 export const LoginAccount=createAsyncThunk("/auth/signup",async(data)=>{
    try {
        const res=axiosInstance.post('user/login',data); 
        toast.promise(res,{
            loading:"wait authentication in progress",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"failed to login"

        })
        console.log(res);
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
 })
 export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.post('user/updateProfile/',data);
        toast.promise(res, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})
export  const LogoutAccount=createAsyncThunk("/auth/logout",async()=>{
    try {
        const res=axiosInstance.get('user/logout'); 
        toast.promise(res,{
            loading:"wait authentication in progress",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"failed to login"

        })
        console.log(res);
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
 })
 export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("user/profile");
        return (await res).data;
    } catch(error) {
        toast.error(error.message);
    }
})
export const changepassword = createAsyncThunk("/user/change/password", async (data) => {
    try {
        const res = axiosInstance.post("user/change-password/",data);
        toast.promise(res,{
            loading:"updating password",
            success:"password updated succesfully",
           

        })
        return (await res).data;
    } catch(error) {
        toast.error(error.message);
    }
})

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(LoginAccount.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isLoggedIn=true;
            state.data=action?.payload?.user;
            state.role=action?.payload?.user?.role;
        })
        .addCase(LogoutAccount.fulfilled,(state,action)=>{
            localStorage.clear();
            state.isLoggedIn=false;
            state.data={};
            state.role='';
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            if(!action?.payload?.user) return;
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role
        });
    }
    }
)

// export const{}=authSlice.actions;

export default authSlice.reducer;