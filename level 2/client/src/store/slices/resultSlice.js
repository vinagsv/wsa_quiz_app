import { createSlice } from "@reduxjs/toolkit";
import { fetchCompletedQuizApi, fetchAttemptsApi } from "../thunks/resultThunk";

const initialState = {
  status: false,
  correctAnswers: [],
  incorrectAnswers: [],
  attempts: 0,
  loading: false,
  error: null,
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchCompletedQuizApi.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = false;
      })
      .addCase(fetchCompletedQuizApi.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.correctAnswers = action.payload.correct_questions || [];
        state.incorrectAnswers = action.payload.incorrect_questions || [];
      })
      .addCase(fetchCompletedQuizApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAttemptsApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttemptsApi.fulfilled, (state, action) => {
        state.loading = false;
        state.attempts = action.payload.attempts || 0;
      })
      .addCase(fetchAttemptsApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resultSlice.reducer;
