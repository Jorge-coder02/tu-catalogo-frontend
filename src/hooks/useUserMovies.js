import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getViews, getPendings } from "../services/movies";
import { getMovieById } from "../services/omdb";
import { setVistas, setPendientes } from "../store/moviesSlice";

export default function useUserMovies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { vistas, pendientes } = useSelector((state) => state.movies);

  const [viewedMovies, setViewedMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  // Redirección si no hay usuario
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Cargar vistas y pendientes desde BBDD
  useEffect(() => {
    if (user) {
      if (vistas.length === 0) {
        getViews()
          .then((data) => dispatch(setVistas(data.vistas)))
          .catch((err) => console.error("Error cargando vistas:", err));
      }

      if (pendientes.length === 0) {
        getPendings()
          .then((data) => dispatch(setPendientes(data.pendientes)))
          .catch((err) => console.error("Error cargando pendientes:", err));
      }
    }
  }, [user, dispatch]);

  // Obtener detalles de películas vistas
  useEffect(() => {
    async function fetchViewed() {
      try {
        const movies = await Promise.all(
          vistas.map((imdbID) => getMovieById(imdbID))
        );
        setViewedMovies(movies);
      } catch (err) {
        console.error("Error cargando detalles de vistas:", err);
      }
    }

    vistas.length ? fetchViewed() : setViewedMovies([]);
  }, [vistas]);

  // Obtener detalles de películas pendientes
  useEffect(() => {
    async function fetchPendings() {
      try {
        const movies = await Promise.all(
          pendientes.map((imdbID) => getMovieById(imdbID))
        );
        setWatchlistMovies(movies);
      } catch (err) {
        console.error("Error cargando detalles de pendientes:", err);
      }
    }

    pendientes.length ? fetchPendings() : setWatchlistMovies([]);
  }, [pendientes]);

  return {
    viewedMovies,
    watchlistMovies,
  };
}
