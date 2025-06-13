import { createSlice } from "@reduxjs/toolkit";
import { logoutUser, signupAPI, loginAPI } from "../thunks/authThunks";

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem("accessToken")?.trim()),
  email: localStorage.getItem("email")?.trim() || null,
  loading: false,
  error: null,
  isTokenExpired: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.email = null;
        state.isTokenExpired = action.payload;
      })
      .addCase(signupAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
        state.email = null;
      })
      .addCase(signupAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.email = action.payload.user.email;
      })
      .addCase(signupAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.email = action.payload.user.email;
      })
      .addCase(loginAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
