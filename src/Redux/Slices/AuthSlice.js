import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import  axiosInstance  from "../../Helpers/axiosInstance";
// import { build } from "vite";    
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
        const res=axiosInstance.post("user/register",data)
        console.log('res'+res);
        toast.promise(res
            // ,console.log('ressss'+res).toString()
            ,{
            loading:"Wait! Creating your account",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to create account"
            // error: (err) => {
            //     console.error('Failed to create account:', err);
            //     return "Failed to create account";
            // }
            // console.log();
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})


export const login=createAsyncThunk('/auth/login',async(data) =>{
    try{
        const res=axiosInstance.post("/user/login",data)
        console.log('res'+res);
        toast.promise(res
            // ,console.log('ressss'+res).toString()
            ,{
            loading:"Wait! Authentication in Progress ",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Login"
            // error: (err) => {
            //     console.error('Failed to create account:', err);
            //     return "Failed to create account";
            // }
            // console.log();
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const logout = createAsyncThunk("/auth/logout",async ()=>{
    try{
        const res=axiosInstance.post("user/logout")
        console.log('res'+res);
        toast.promise(res,{
            loading:"Wait! Logout in Progress ",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Logout"
        });
        // console.log('check');
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
    extraReducers:(builder)=>{
        // if login in successfull then what to ds
        builder
        .addCase(login.fulfilled,(state,action)=>{
            // setting the data in the form of string 
            // we have stored in local storage because
            // statte will be fetched from local storage
            // current state will not be accessed from the local storage thatswhy we have saved in the state
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn=true
            state.data=action?.payload?.user
            state.role=action?.payload?.user?.role
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.data={}
            state.isLoggedIn=false
            state.role=""
        })
    }
})

// export const {}=authSlice.actions
export default authSlice.reducer