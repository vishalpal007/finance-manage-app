import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "./userApi";

const userSlice = createSlice({
    name: "userSlice",
    initialState: { user: JSON.parse(localStorage.getItem("finance")) },
    reducers: {},
    extraReducers: builder => builder
        .addMatcher(userApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            state.user = payload
        })


        .addMatcher(userApi.endpoints.logoutUser.matchFulfilled, (state, { payload }) => {
            state.user = null
        })
})


export default userSlice.reducer