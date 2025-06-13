import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiRequest";
import {
  FETCH_QUESTIONS_ENDPOINT,
  VALIDATE_ANSWER_ENDPOINT,
  SUBMIT_QUIZ_ENDPOINT,
} from "../../utils/endpoint";
import { toast } from "react-toastify";

export const fetchQuestionsApi = createAsyncThunk(
  "questions/fetch",
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest({
        endpoint: FETCH_QUESTIONS_ENDPOINT,
      });
      // Assume response has questions array; no need for success field
      const questions = response.questions.map((q) => ({
        _id: q._id,
        text: q.question,
        options: q.options,
        attempted: q.attempted,
        answer_status: q.answer_status,
      }));
      return { questions };
    } catch (error) {
      const errorMessage = error.message || "Couldn't fetch questions";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const validateAnswerApi = createAsyncThunk(
  "questions/validateAnswer",
  async ({ questionId, answer }, thunkAPI) => {
    try {
      console.log("Validating answer:", { questionId, answer });
      const response = await apiRequest({
        endpoint: VALIDATE_ANSWER_ENDPOINT,
        method: "POST",
        body: {
          questionId,
          answer,
        },
      });
      console.log("Validate answer response:", response);
      // Assume response has status (1 for correct, 0 for incorrect) and correct_answer
      if (typeof response.status !== "number") {
        throw new Error("Invalid response format from server");
      }
      return response;
    } catch (error) {
      console.error("Validate answer error:", error.message);
      return thunkAPI.rejectWithValue(
        error.message || "Couldn't validate answer"
      );
    }
  }
);

export const submitQuizApi = createAsyncThunk(
  "questions/submitQuiz",
  async (_, thunkAPI) => {
    try {
      console.log("Submitting quiz");
      const response = await apiRequest({
        endpoint: SUBMIT_QUIZ_ENDPOINT,
        method: "POST",
      });
      console.log("Submit quiz response:", response);
      return response;
    } catch (error) {
      console.error("Submit quiz error:", error.message);
      return thunkAPI.rejectWithValue(error.message || "Couldn't submit quiz");
    }
  }
);
