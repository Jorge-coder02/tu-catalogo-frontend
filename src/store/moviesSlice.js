import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vistas: [],
  pendientes: [],
  categoriaSeleccionada: "all", // Para filtrar por categoría
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Categoría seleccionada filtor
    setCategoriaSeleccionada: (state, action) => {
      state.categoriaSeleccionada = action.payload;
    },
    // Vistas 👀
    setVistas: (state, action) => {
      state.vistas = action.payload;
    },
    addVista: (state, action) => {
      if (!state.vistas.includes(action.payload)) {
        state.vistas.push(action.payload);
      }
    },
    removeVista: (state, action) => {
      state.vistas = state.vistas.filter((id) => id !== action.payload);
    },
    clearVistas: (state) => {
      state.vistas = [];
    },

    // Pendientes 🕐
    setPendientes: (state, action) => {
      state.pendientes = action.payload;
    },
    addPendiente: (state, action) => {
      if (!state.pendientes.includes(action.payload)) {
        state.pendientes.push(action.payload);
      }
    },
    removePendiente: (state, action) => {
      state.pendientes = state.pendientes.filter((id) => id !== action.payload);
    },
    clearPendientes: (state) => {
      state.pendientes = [];
    },
  },
});

export const {
  setVistas,
  addVista,
  clearVistas,
  removeVista,
  addPendiente,
  setPendientes,
  clearPendientes,
  removePendiente,
  setCategoriaSeleccionada,
} = moviesSlice.actions;
export default moviesSlice.reducer;
