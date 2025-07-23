// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import authReducer from "./authSlice";
import moviesReducer from "./moviesSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
    movies: moviesReducer,
  },
});
