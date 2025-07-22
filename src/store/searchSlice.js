/* eslint-disable no-unused-vars */
// src/store/searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  term: "", // lo que el usuario busca: "Batman"
  results: [], // los resultados de búsqueda
  status: "idle", // idle | loading | succeeded | failed
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setTerm(state, action) {
      state.term = action.payload;
    },
    setResults(state, action) {
      state.results = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    resetSearch(state) {
      return initialState;
    },
  },
});

export const { setTerm, setResults, setStatus, resetSearch } =
  searchSlice.actions;
export default searchSlice.reducer;
