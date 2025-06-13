import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiRequest";
import {
  COMPLETED_QUIZ_ENDPOINT,
  QUIZ_ATTEMPTS_ENDPOINT,
} from "../../utils/endpoint";
import { toast } from "react-toastify";

export const fetchCompletedQuizApi = createAsyncThunk(
  "result/fetchQuiz",
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest({
        endpoint: COMPLETED_QUIZ_ENDPOINT,
      });
      return response;
    } catch (error) {
      const errorMessage = error.message || "Couldn't fetch results";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchAttemptsApi = createAsyncThunk(
  "result/fetchAttempts",
  async (_, thunkAPI) => {
    try {
      const response = await apiRequest({
        endpoint: QUIZ_ATTEMPTS_ENDPOINT,
      });
      return response;
    } catch (error) {
      const errorMessage = error.message || "Couldn't fetch attempts";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
