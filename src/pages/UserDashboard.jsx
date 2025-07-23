import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMovieById } from "../services/omdb";
import { getViews, addToViews, removeFromViews } from "../services/movies";
import { setVistas, removeVista } from "../store/moviesSlice";

import MovieCard from "../components/ui/MovieCard";

function UserDashboard() {
  const navigate = useNavigate();

  const [moviesDetails, setMoviesDetails] = useState([]);
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const vistas = useSelector((state) => state.movies.vistas);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // o la ruta que uses
    }
  }, [user, navigate]);

  // Cargar vistas del usuario desde bbdd
  useEffect(() => {
    if (user && vistas.length === 0) {
      getViews()
        .then((data) => {
          dispatch(setVistas(data.vistas));
        })
        .catch((err) => {
          console.error("Error cargando vistas:", err);
        });
    }
  }, [user, dispatch]);

  // Obtener detalles de las películas vistas
  useEffect(() => {
    async function fetchMoviesDetails() {
      try {
        const movies = await Promise.all(
          vistas.map((imdbID) => getMovieById(imdbID))
        );
        setMoviesDetails(movies);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    if (vistas.length > 0) {
      fetchMoviesDetails();
    } else {
      setMoviesDetails([]); // limpio si no hay vistas
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
            {moviesDetails.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie} // Aquí deberías pasar el objeto completo de la película
              />
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Tus Pendientes</h2>
            {/* Mostrar las películas que el usuario tiene en pendientes */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
