import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../lib/utils";
import { FETCH_QUESTIONS_ENDPOINT, VALIDATE_ANSWER_ENDPOINT } from "../../lib/endpoints";

export const fetchQuestionsAPI = createAsyncThunk("question/fetch", async (_, thunkAPI) => {
    try {
        const response = await apiRequest({
            endpoint: FETCH_QUESTIONS_ENDPOINT,
            method: "GET",
            includeAuth: true,
        });
        const data = await response.json();
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data?.message);
        }
        return data;
    } catch (err) {
        let message = err?.message || "Could not fetch questions";
        if (err?.response?.data?.message) message = err?.response?.data?.message;
        console.error(message);
        toast.error(message);
        return thunkAPI.rejectWithValue(message);
    }
});

export const validateAnswerAPI = createAsyncThunk(
    "question/validateAnswer",
    async (values, thunkAPI) => {
        try {
            const response = await apiRequest({
                endpoint: VALIDATE_ANSWER_ENDPOINT,
                method: "POST",
                includeAuth: true,
                body: {
                    id: values.questionId,
                    answer: values.answer,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                return thunkAPI.rejectWithValue(data?.message);
            }
            return data;
        } catch (err) {
            let message = err?.message;
            if (err?.response?.data?.message) message = err?.response?.data?.message;
            console.error(message);
            toast.error(message);
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const submitQuizAPI = createAsyncThunk("question/submitQuiz", async (_, thunkAPI) => {
    try {
        const response = await apiRequest({
            endpoint: SUBMIT_QUIZ_ENDPOINT,
            method: "POST",
            includeAuth: true,
        });
        const data = await response.json();
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data?.message);
        }
        return data;
    } catch (err) {
        let message = err?.message;
        if (err?.response?.data?.message) message = err?.response?.data?.message;
        console.error(message);
        toast.error(message);
        return thunkAPI.rejectWithValue(err);
    }
});
