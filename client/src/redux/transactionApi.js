import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const transactionApi = createApi({
    reducerPath: "transactionApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/transaction`, credentials: "include" }),
    tagTypes: ["transaction"],
    endpoints: (builder) => {
        return {
            getTransaction: builder.mutation({
                query: (userData) => {
                    return {
                        url: "/transactions",
                        method: "POST",
                        body: userData
                    }
                },
                providesTags: ["transaction"],
                transformResponse: data => data.result
            }),
            addTransaction: builder.mutation({
                query: userData => {
                    return {
                        url: "/add-transactions",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["transaction"]
            }),


            deleteTransaction: builder.mutation({
                query: id => {
                    return {
                        url: `/transactions/${id}`,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["transaction"]
            }),


            summaryTransaction: builder.query({
                query: id => {
                    return {
                        url: `/transactions/${id}`,
                        method: "GET",
                    }
                },
                invalidatesTags: ["transaction"],
                transformResponse: data => data.result
            }),

        }
    }
})

export const { useGetTransactionMutation, useAddTransactionMutation, useDeleteTransactionMutation, useLazySummaryTransactionQuery } = transactionApi
