import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './AuthSlice'
import CourseSliceReducer from "./CourseSlice";
import lectureSliceReducer from "./LectureSlice"
import StateSliceReducer from "./StateSlice";
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        course:CourseSliceReducer,
        lecture:lectureSliceReducer,
        stat:StateSliceReducer
    },
    devTools:true
})

export default store