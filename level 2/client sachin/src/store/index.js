import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import questionReducer from "./slices/questionSlice";
import resultReducer from "./slices/resultSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        questions: questionReducer,
        result : resultReducer
    },
});

export default store;
