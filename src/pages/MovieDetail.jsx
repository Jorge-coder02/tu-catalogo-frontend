import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById, fetchTMDBMovieById, getTrailer } from "../services/omdb";

import MovieCard from "../components/ui/MovieCard.jsx";
import Button from "../components/ui/Button.styles.jsx";

export default function MovieDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // imdbID de la película
  // Estado
  const [movie, setMovie] = useState(null);
  const [infoMovie, setInfoMovie] = useState(null); // info detallada tmdb (obtengo imágen backdrop)
  const [movieTrailer, setMovieTrailer] = useState(null);

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
          getTrailer(id).then((trailerUrl) => {
            setMovieTrailer(trailerUrl);
          });
        }
      } catch (error) {
        console.error("Error al obtener la película:", error);
      }
    };

    fetchAll();
  }, [id]);

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
          <MovieCard movie={movie}></MovieCard>
          {/* <img src={movie.Poster} alt={movie.Title} className="w-60 mb-4" /> */}
        </div>
        {/* Contenido película */}
        <div className="flex flex-col gap-y-10 max-w-md pb-16">
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
          <div className="flex items-center justify-center">
            <Button
              className={"w-1/3"}
              onClick={() => window.open(`${movieTrailer}`, "_blank")}
              variant="danger"
            >
              Ver tráiler
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
