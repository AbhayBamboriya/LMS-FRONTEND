import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import toast from "react-hot-toast"
// import axiosInstance from "../../Helpers/axiosInstance"
// import { response } from "express"

const initialState = {
    lectures: []
};


export const getAllCoursesLectures = createAsyncThunk("/courses/lecture/get", async (cid) => {
    try{
        const res=axiosInstance.get(`/courses/${cid}`)
        toast.promise(response,{
            loading:'Fetching Course lectures',
            success:'Lecture Fetched Successfully',
            error:'Failed to load lectures'
        })
        return (await response).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const addCourseLecture = createAsyncThunk("/courses/lecture/add", async (data) => {
    try{
        const formData=new FormData()
        formData.append("lecture",data.lecture)
        formData.append("title",data.title)
        formData.append("description",data.description)

        const res=axiosInstance.post(`/courses/${data.id}`,formData)
        toast.promise(response,{
            loading:'Adding Course lectures',
            success:'Lecture Added Successfully',
            error:'Failed to Add the lectures'
        })
        return (await response).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const deleteCourseLecutre = createAsyncThunk("/courses/lecture/delete", async (data) => {
    try{
        const res=axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`)
        toast.promise(response,{
            loading:'Deleting Course lectures',
            success:'Lecture deleted Successfully',
            error:'Failed to delete lectures'
        })
        return (await response).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

const lectureSlice= createSlice({
    name:'lecture',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCoursesLectures.fulfilled,(state,action)=>{
            state.lectures=action?.payload?.lectures
        })
        .addCase(addCourseLecture.fulfilled,(state,action)=>{
            state.lectures=action?.payload?.course?.lectures
        })
    }

})


export default lectureSlice.reducer