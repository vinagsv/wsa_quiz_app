import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../lib/utils";
import { SIGNUP_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from "../../lib/endpoints";
import toast from "react-hot-toast";

export const sigupAPI = createAsyncThunk("auth/signup", async (values, thunkAPI) => {
    try {
        const response = await apiRequest({
            endpoint: SIGNUP_ENDPOINT,
            method: "POST",
            includeAuth: false,
            body: {
                name: values.username,
                email: values.email,
                password: values.password,
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
});

// login
export const loginAPI = createAsyncThunk("auth/login", async (values, thunkAPI) => {
    try {
        const response = await apiRequest({
            endpoint: LOGIN_ENDPOINT,
            method: "POST",
            includeAuth: false,
            body: {
                email: values.email,
                password: values.password,
            },
        });
        const data = await response.json();

        if (!response.ok) {
            return thunkAPI.rejectWithValue(data?.message);
        }

        // get access token
        if (data?.accessToken) localStorage.setItem("token", data?.accessToken);
        localStorage.setItem("email", values.email);

        return values.email;
    } catch (err) {
        let message = err?.message;
        if (err?.response?.data?.message) message = err?.response?.data?.message;
        console.error(message);
        toast.error(message);
        return thunkAPI.rejectWithValue(err);
    }
});

// logout
export const logoutAPI = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        const response = await apiRequest({
            endpoint: LOGOUT_ENDPOINT,
            method: "GET",
            includeAuth: true,
        });
        const data = await response.json();
        if (!response.ok) {
            return thunkAPI.rejectWithValue(data?.message);
        }
        // get access token
        localStorage.removeItem("token");
        localStorage.removeItem("email");

        return data;
    } catch (err) {
        let message = err?.message;
        if (err?.response?.data?.message) message = err?.response?.data?.message;
        console.error(message);
        toast.error(message);
        return thunkAPI.rejectWithValue(err);
    }
});
