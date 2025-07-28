import { useParams, useNavigate } from "react-router-dom";
import useMovieDetails from "../hooks/useMovieDetail";

import MovieCard from "../components/ui/MovieCard";
import Button from "../components/ui/Button.styles";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, infoMovie, movieTrailer, loading } = useMovieDetails(id);

  if (loading)
    return (
      <div className="p-10 text-center">
        <LoadingSpinner delay={0} />
      </div>
    );

  if (!movie)
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        No se pudo cargar la película.
      </div>
    );

  return (
    <div>
      <div
        className="w-full h-[35dvh] relative"
        style={{
          backgroundImage: infoMovie?.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${infoMovie.backdrop_path})`
            : `url(/img/imgnotfound.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
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

      <div className="p-12 md:pt-8 md:pb-20 mt-10 flex md:flex-row flex-col gap-x-12 items-center justify-center">
        <div className="flex flex-col items-center">
          <MovieCard movie={movie} />
        </div>

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

          {movieTrailer && (
            <div className="flex items-center justify-center">
              <Button
                className="w-1/3"
                onClick={() => window.open(movieTrailer, "_blank")}
                variant="danger"
              >
                Ver tráiler
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
