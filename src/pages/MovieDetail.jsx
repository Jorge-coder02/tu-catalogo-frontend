import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { getMovieById, fetchTMDBMovieById } from "../services/omdb";

// import { addToViews, removeFromViews } from "../services/movies.js";
// import { setVistas, removeVista } from "../store/moviesSlice.js";

import StyledButton from "../components/ui/Button.styles.jsx";

export default function MovieDetail() {
  const { id } = useParams(); // este es el imdbID
  const [movie, setMovie] = useState(null);
  const [infoMovie, setInfoMovie] = useState(null);
  const navigate = useNavigate();

  // Estado
  // const dispatch = useDispatch();
  // const { user, vistas } = useSelector((state) => state.auth); // recojo valores de user
  // let isVista = "";
  // if (vistas) {
  //   isVista = vistas.includes(movie.imdbID);
  // }

  // 🚀🎬 Fetch movie data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Primero fetch de OMDB
        const movieData = await getMovieById(id);
        setMovie(movieData);

        // Luego, si movieData existe, fetch a TMDB (imagen backdrop)
        if (movieData) {
          const tmdbData = await fetchTMDBMovieById(id);
          setInfoMovie(tmdbData);
        }
      } catch (error) {
        console.error("Error al obtener la película:", error);
      }
    };

    fetchAll();
  }, [id]);

  // const handleAddToViews = (imdbID) => {
  //   // 🚨 Verifica si el usuario está autenticado
  //   if (!user) {
  //     alert("Por favor, inicia sesión para añadir a vistas.");
  //     // *aquí abrir modal de inicio de sesión*
  //     return;
  //   }
  //   // 🛠 Manejar si se pulsa Añadir o Quitar de vistas
  //   // ✅ Añadir a vistas
  //   if (!isVista) {
  //     addToViews(imdbID)
  //       .then((response) => {
  //         if (response.alreadyAdded) {
  //           console.warn("La película ya estaba en vistas.");
  //         } else {
  //           dispatch(setVistas(response.vistas)); // 🔥 ACTUALIZA REDUX
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error al añadir película a vistas:", error);
  //       });
  //   }
  //   // ❌ Quitar de vistas
  //   else {
  //     removeFromViews(imdbID)
  //       .then(() => {
  //         dispatch(removeVista(imdbID)); // 🔥 ACTUALIZA REDUX
  //       })
  //       .catch((error) => {
  //         console.error("Error al quitar película de vistas:", error);
  //       });
  //   }
  // };

  if (!movie) return <div>Cargando...</div>; // * añadir LoadingSpinner *

  return (
    <div>
      <div
        className="w-full h-[35dvh] relative"
        style={{
          backgroundImage:
            infoMovie && infoMovie.backdrop_path
              ? `url(https://image.tmdb.org/t/p/original${infoMovie.backdrop_path})`
              : `url(/img/imgnotfound.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "inset 0 -100px 80px -20px rgba(0, 0, 0, 0.7)",
        }}
      >
        <button
          className="absolute top-4 left-4 text-white font-medium bg-black/60 hover:bg-black/90 px-3 py-1 rounded"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>
      </div>

      {/* 🎬 Contenedor principal película */}
      <div className="p-12 md:pt-8 md:pb-20 gap-y-8 mt-10 flex md:flex-row flex-col gap-x-12 items-center justify-center">
        {/* Imagen película */}
        <div className="flex flex-col items-center justify-center">
          <img src={movie.Poster} alt={movie.Title} className="w-60 mb-4" />
        </div>
        {/* Contenido película */}
        <div className="flex flex-col gap-y-10 max-w-md">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {movie.Title} ({movie.Year})
            </h1>
            <p>
              <strong>Género:</strong> {movie.Genre}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <p>
              <strong>Reparto:</strong> {movie.Actors}
            </p>
            <p>
              <strong>IMDb:</strong> {movie.imdbRating}/10
            </p>
          </div>

          <div>
            <strong>Sinopsis:</strong>{" "}
            <span className="font-semibold">{movie.Plot}</span>
          </div>
          {/* <StyledButton
            variant={`${isVista ? "secondary" : "primary"}`}
            onClick={() => handleAddToViews(movie.imdbID)}
          >
            {isVista ? "Quitar de vistas" : "Añadir a vistas"}
          </StyledButton> */}
        </div>
      </div>
    </div>
  );
}
