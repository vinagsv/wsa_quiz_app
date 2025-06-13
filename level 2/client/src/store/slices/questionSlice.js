import { createSlice } from "@reduxjs/toolkit";
import {
  fetchQuestionsApi,
  validateAnswerApi,
  submitQuizApi,
} from "../thunks/questionThunk";

const initialState = {
  questions: [],
  activeQuestionId: "",
  loading: true,
  isValidatingAnswer: false,
  isSubmittingQuiz: false,
  error: null,
};

const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    activeNextQuestion(state) {
      const currentIndex = state.questions.findIndex(
        (question) => question._id === state.activeQuestionId
      );
      if (currentIndex !== -1 && currentIndex + 1 < state.questions.length) {
        state.activeQuestionId = state.questions[currentIndex + 1]._id;
      } else {
        state.activeQuestionId = state.activeQuestionId;
      }
    },
    resetQuestions(state) {
      return initialState; // Reset state to initial values
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestionsApi.pending, (state) => {
        state.questions = [];
        state.activeQuestionId = "";
        state.loading = true;
        state.isValidatingAnswer = false;
        state.error = null;
      })
      .addCase(fetchQuestionsApi.fulfilled, (state, action) => {
        state.questions = action.payload.questions;
        state.activeQuestionId =
          action.payload.questions?.find((question) => !question.attempted)
            ?._id || "";
        state.loading = false;
      })
      .addCase(fetchQuestionsApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(validateAnswerApi.pending, (state) => {
        state.isValidatingAnswer = true;
        state.error = null;
      })
      .addCase(validateAnswerApi.fulfilled, (state, action) => {
        state.isValidatingAnswer = false;
        const isCorrect = action.payload.status === 1;
        const activeQuestionIndex = state.questions.findIndex(
          (question) => question._id === state.activeQuestionId
        );
        if (activeQuestionIndex !== -1) {
          state.questions[activeQuestionIndex].attempted = true;
          state.questions[activeQuestionIndex].answer_status = isCorrect
            ? "right"
            : "wrong";
        }
      })
      .addCase(validateAnswerApi.rejected, (state, action) => {
        state.isValidatingAnswer = false;
        state.error = action.payload;
      })
      .addCase(submitQuizApi.pending, (state) => {
        state.isSubmittingQuiz = true;
        state.error = null;
      })
      .addCase(submitQuizApi.fulfilled, (state) => {
        state.isSubmittingQuiz = false;
        state.questions = [];
        state.activeQuestionId = "";
      })
      .addCase(submitQuizApi.rejected, (state, action) => {
        state.isSubmittingQuiz = false;
        state.error = action.payload;
      });
  },
});

export const { activeNextQuestion, resetQuestions } = questionSlice.actions;
export default questionSlice.reducer;
