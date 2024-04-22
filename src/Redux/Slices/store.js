import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './AuthSlice'
import CourseSliceReducer from "./CourseSlice";
import lectureSliceReducer from "./LectureSlice"
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        course:CourseSliceReducer,
        lecture:lectureSliceReducer
    },
    devTools:true
})

export default store