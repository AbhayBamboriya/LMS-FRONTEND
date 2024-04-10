import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './AuthSlice'
import CourseSliceReducer from "./CourseSlice";
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        course:CourseSliceReducer
          
    },
    devTools:true
})

export default store