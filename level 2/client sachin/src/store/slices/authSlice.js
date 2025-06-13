import { createSlice } from "@reduxjs/toolkit";
import { loginAPI, logoutAPI, sigupAPI } from "../thunk/authThunk";
const initialState = {
    isAuthenticated: Boolean(localStorage.getItem("token")?.trim()),
    email: localStorage.getItem("email")?.trim() || null,
    loading: false,
    error: null,
    isTokenExpired: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAPI.pending, (state) => {
                state.loading = true;
                state.email = null;
                state.error = null;
            })
            .addCase(loginAPI.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.loading = false;
                state.email = action.payload;
            })
            .addCase(loginAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(logoutAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutAPI.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.email = null;
            })
            .addCase(logoutAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(sigupAPI.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sigupAPI.fulfilled, (state) => {
                state.loading = false;
                const { user } = action.payload;
                state.email = user?.email;
                state.isAuthenticated = true;
            })
            .addCase(sigupAPI.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
