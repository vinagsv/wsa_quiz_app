import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../lib/utils";
import { QUIZ_ATTEMPTS_ENDPOINT, QUIZ_COMPLETED_ENDPOINT } from "../../lib/endpoints";

export const fetchCompletedQuizAPI = createAsyncThunk("result/fetchQuiz", async (_, thunkAPI) => {
    try {
        const response = await apiRequest({
            endpoint: QUIZ_COMPLETED_ENDPOINT,
            method: "GET",
            includeAuth: true,
        });
        const data = await response.json();
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data?.message);
        }
        return data;
    } catch (err) {
        let message = err?.message || "could not fetch result";
        if (err?.response?.data?.message) message = err?.response?.data?.message;
        console.error(message);
        toast.error(message);
        return thunkAPI.rejectWithValue(err);
    }
});

export const fetchAttemptsApi = createAsyncThunk("result/fetchAttempts", async (_, thunkAPI) => {
    try {
        const response = await apiRequest({
            endpoint: QUIZ_ATTEMPTS_ENDPOINT,
            method: "GET",
            includeAuth: true,
        });
        const data = await response.json();
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data?.message);
        }
        return data;
    } catch (err) {
        let message = err?.message || "could not fetch result";
        if (err?.response?.data?.message) message = err?.response?.data?.message;
        console.error(message);
        toast.error(message);
        return thunkAPI.rejectWithValue(err);
    }
});
