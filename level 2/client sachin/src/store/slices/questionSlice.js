import { createSlice } from "@reduxjs/toolkit";
import { fetchQuestionsAPI, submitQuizAPI, validateAnswerAPI } from "../thunk/questionsThunk";

const initialState = {
    questions: [],
    activeQuestionId: "",
    loading: false,
    isValidatingAnswer: false,
    isSubmittingQuiz: false,
    error: null,
};

const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        activeNextQuestion(state) {
            const currentIndex = state.questions.findIndex((q) => q._id === state.activeQuestionId);
            if (currentIndex !== -1 && currentIndex + 1 < state.questions.length) {
                state.activeQuestionId = state.questions[currentIndex + 1]._id;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestionsAPI.pending, (state) => {
                state.loading = true;

                state.questions = [];
                state.activeQuestionId = "";
                state.isValidatingAnswer = false;
                state.isSubmittingQuiz = false;
                state.error = null;
            })
            .addCase(fetchQuestionsAPI.fulfilled, (state, action) => {
                state.activeQuestionId =
                    action.payload.questions?.find((question) => !question.attempted)?._id || "";

                state.questions = action.payload.questions;
                state.isValidatingAnswer = false;
                state.isSubmittingQuiz = false;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchQuestionsAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(validateAnswerAPI.pending, (state) => {
                state.isValidatingAnswer = true;
                state.error = null;
            })
            .addCase(validateAnswerAPI.fulfilled, (state, action) => {
                state.isValidatingAnswer = false;
                const isCorrect = action.payload.status === 1;
                const activeQuestionId = state.activeQuestionId;
                const activeQuestionIndex = state.questions.findIndex(
                    (q) => q._id === activeQuestionId
                );
                state.questions[activeQuestionIndex].attempted = true;
                state.questions[activeQuestionIndex].answer_status = isCorrect
                    ? "correct"
                    : "wrong";

                state.error = null;
            })
            .addCase(validateAnswerAPI.rejected, (state, action) => {
                state.isValidatingAnswer = false;
                state.error = action.payload;
            });

        builder
            .addCase(submitQuizAPI.pending, (state) => {
                state.isSubmittingQuiz = true;
                state.error = null;
            })
            .addCase(submitQuizAPI.fulfilled, (state, action) => {
                state.isSubmittingQuiz = false;
                if (action.payload.status) {
                    state.questions = [];
                    state.activeQuestionId = "";
                } else state.error = "could not submit quiz";
            })
            .addCase(submitQuizAPI.rejected, (state, action) => {
                state.isSubmittingQuiz = false;
                state.error = action.payload;
            });
    },
});

export const { activeNextQuestion } = questionSlice.actions;
export default questionSlice.reducer;
