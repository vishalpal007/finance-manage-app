import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/user`, credentials: "include" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            loginUser: builder.mutation({
                query: (userData) => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("finance", JSON.stringify(data.result))
                    return data.result
                }
            }),
            registerUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/register",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["user"]
            }),

            logoutUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/logout",
                        method: "POST",
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("finance")
                    return data
                }
            }),

        }
    }
})

export const { useLoginUserMutation, useRegisterUserMutation, useLogoutUserMutation } = userApi
