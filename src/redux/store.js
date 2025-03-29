import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid warnings for non-serializable data
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable DevTools only in development
});

export default store;
