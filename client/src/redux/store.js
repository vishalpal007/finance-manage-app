import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import userSlice from "./userSlice";
import { transactionApi } from "./transactionApi";


const reduxStore = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer,
        auth: userSlice
    },
    middleware: def => [...def(), userApi.middleware, transactionApi.middleware]
})

export default reduxStore