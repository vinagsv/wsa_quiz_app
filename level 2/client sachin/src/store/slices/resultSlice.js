import { createSlice } from "@reduxjs/toolkit";
import { fetchAttemptsApi, fetchCompletedQuizAPI } from "../thunk/resultThunk";

const initialState = {
    status: false,
    inCorrectAnswers: [],
    correctAnswers: [],
    attempts: 0,
    loading: false,
    error: null,
};

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompletedQuizAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = false;
            })
            .addCase(fetchCompletedQuizAPI.fulfilled, (state, action) => {
                state.status = action.payload?.status;
                state.inCorrectAnswers = action.payload?.inCorrectAnswers;
                state.correctAnswers = action.payload?.correctAnswers;
                state.loading = false;
            })
            .addCase(fetchCompletedQuizAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(fetchAttemptsApi.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAttemptsApi.fulfilled, (state, action) => {
                state.loading = false;
                state.attempts = action.payload;
            })
            .addCase(fetchAttemptsApi.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const resultActions = resultSlice.actions;
export default resultSlice.reducer;
