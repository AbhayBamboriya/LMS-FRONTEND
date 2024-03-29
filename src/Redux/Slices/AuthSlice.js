import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import  axiosInstance  from "../../Helpers/axiosInstance";
// authSlice is for authenticatino purpose

// initial state of auth slice
const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn')   || false,
    role:localStorage.getItem('role') || "",
    data:localStorage.getItem('data') || {},
}  
// thunk is used to provide the delay
// string is passed in createAsyncThunk to uniquely identify
export const createAccount=createAsyncThunk('/auth/signup',async(data) =>{
    try{
        const res=axiosInstance.post('user/register',data)
        console.log('res'+res);
        toast.promise(res,{
            loading:"Wait! Creating your account",
            
            success:(d)=>{
                return d?.d?.message
            },
            error:"Failed to create account"
        })
        console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
})

// export const {}=authSlice.actions
export default authSlice.reducer