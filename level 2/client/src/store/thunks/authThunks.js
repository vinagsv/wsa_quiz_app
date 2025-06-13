import { createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/apiRequest";
import { SIGNUP_ENDPOINT, LOGIN_ENDPOINT } from "../../utils/endpoint";
import { toast } from "react-toastify";

export const signupAPI = createAsyncThunk(
  "auth/signup",
  async (values, thunkAPI) => {
    try {
      const response = await apiRequest({
        endpoint: SIGNUP_ENDPOINT,
        method: "POST",
        includeAuth: false,
        body: {
          username: values.username,
          email: values.email,
          password: values.password,
        },
      });
      if (!response.success) {
        throw new Error(response.message || "Signup failed");
      }
      // Auto-login after signup
      const loginResponse = await apiRequest({
        endpoint: LOGIN_ENDPOINT,
        method: "POST",
        includeAuth: false,
        body: {
          email: values.email,
          password: values.password,
        },
      });
      if (!loginResponse.success) {
        throw new Error(
          loginResponse.message || "Auto-login after signup failed"
        );
      }
      const { accessToken, user } = loginResponse;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("email", user.email);
      return { user };
    } catch (error) {
      const errorMessage = error.message || "Could not register user";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const loginAPI = createAsyncThunk(
  "auth/login",
  async (values, thunkAPI) => {
    try {
      const response = await apiRequest({
        endpoint: LOGIN_ENDPOINT,
        method: "POST",
        includeAuth: false,
        body: values,
      });
      const { accessToken, user } = response;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("email", user.email);
      return { user };
    } catch (error) {
      const errorMessage = error.message || "Could not login";
      toast.error(errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (isTokenExpired = false, thunkAPI) => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("email");
    return isTokenExpired;
  }
);
