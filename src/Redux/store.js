import { configureStore,  } from "@reduxjs/toolkit";

import authSliceReducer from "./Slices/AuthSlice";
import CourseSliceReducer from "./Slices/CourseSlice";
import LectureSliceReducer from "./Slices/LectureSlice";
import RazorPaySliceReducer from "./Slices/RazorPaySlice";
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        course:CourseSliceReducer,
        razorpay:RazorPaySliceReducer,
        Lecture:LectureSliceReducer
    },
    devTools:true
})

export default store;