import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMovieById } from "../services/omdb";
import { getViews, getPendings } from "../services/movies";
import { setVistas, setPendientes } from "../store/moviesSlice"; // * *

import MovieCard from "../components/ui/MovieCard";

function UserDashboard() {
  const navigate = useNavigate();

  const [viewedMovies, setViewedMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { vistas, pendientes } = useSelector((state) => state.movies);

  // Validar logueo existente
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 👀 Cargar vistas del usuario desde bbdd
  useEffect(() => {
    // 🎬👀
    if (user && vistas.length === 0) {
      getViews()
        .then((data) => {
          dispatch(setVistas(data.vistas));
        })
        .catch((err) => {
          console.error("Error cargando vistas:", err);
        });
    }
    // 🎬🕐
    if (user && pendientes.length === 0) {
      getPendings()
        .then((data) => {
          dispatch(setPendientes(data.pendientes));
        })
        .catch((err) => {
          console.error("Error cargando vistas:", err);
        });
    }
  }, [user, dispatch]);

  // 🕐 Cargar pendientes del usuario desde bbdd
  useEffect(() => {
    async function fetchPendingMoviesDetails() {
      try {
        const movies = await Promise.all(
          pendientes.map((imdbID) => getMovieById(imdbID))
        );
        setWatchlistMovies(movies);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    if (pendientes.length > 0) {
      fetchPendingMoviesDetails();
    } else {
      setWatchlistMovies([]); // limpio si no hay vistas
    }
  }, [pendientes]);

  // 👀 Obtener detalles de las películas vistas
  useEffect(() => {
    async function fetchViewedMoviesDetails() {
      try {
        const movies = await Promise.all(
          vistas.map((imdbID) => getMovieById(imdbID))
        );
        setViewedMovies(movies);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    if (vistas.length > 0) {
      fetchViewedMoviesDetails();
    } else {
      setViewedMovies([]); // limpio si no hay vistas
    }
  }, [vistas]);

  return (
    <div className="min-h-[calc(100dvh-64px)] pt-16 container mx-auto p-4">
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-4">Dashboard de Usuario</h1>
        <p className="text-gray-600">
          Aquí puedes gestionar tus vistas y pendientes.
        </p>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Tus Vistas</h2>
          {/* Mostrar las películas que el usuario ha visto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {viewedMovies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie} // Aquí deberías pasar el objeto completo de la película
              />
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Tus Pendientes</h2>
            {/* Mostrar las películas que el usuario tiene en pendientes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {watchlistMovies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
