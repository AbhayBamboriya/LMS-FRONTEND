import {createAsyncThunk, createSlice} from '@reduxjs/toolkit' 
import axiosInstance from '../../Helpers/axiosInstance'
import { toast } from "react-hot-toast";
const initialState = {
    courseData:[]
}
export const getAllCourses = createAsyncThunk("/course/get",async()=>{
    try{
        const response=axiosInstance.get("/course")
        console.log("vbfck"+response);
        toast.promise(response,{
            loading:"Loading Course Data....",
            success:"Courses Loaded Successfully",
            error:"Failed to get the Courses"
        })
        console.log("xjds"+ (await response).data.course);
        return (await response).data.course
    }
    catch(e){
        toast.error(error?.response?.data?.message)
    }
})
const courseSlices=createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getAllCourses.fulfilled,(state,action) => {
            if(action.payload){
                console.log(action.payload);
                state.courseData = [...action.payload]
            }
            else{
                console.log("fggfhkd");
            }
        })
    }
})

export default courseSlices.reducer