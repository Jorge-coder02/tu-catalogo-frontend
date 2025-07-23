import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vistas: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setVistas: (state, action) => {
      state.vistas = action.payload;
    },
    addVista: (state, action) => {
      if (!state.vistas.includes(action.payload)) {
        state.vistas.push(action.payload);
      }
    },
    clearVistas: (state) => {
      state.vistas = [];
    },
  },
});

export const { setVistas, addVista, clearVistas } = moviesSlice.actions;
export default moviesSlice.reducer;
