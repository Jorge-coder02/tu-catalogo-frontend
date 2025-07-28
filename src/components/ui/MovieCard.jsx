import { useNavigate } from "react-router-dom";
import PosterImage from "./PosterImage";
import StyledButton from "./Button.styles";
import useMovieActions from "../../hooks/useMovieActions";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const { isVista, isPendiente, toggleVista, togglePendiente } =
    useMovieActions();

  const handleCardClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <div className="flex flex-col items-center rounded-lg p-4 gap-3 w-full">
      <PosterImage
        onClick={handleCardClick}
        src={movie.Poster}
        alt={movie.Title}
        className="cursor-pointer hover:opacity-90 transition-all ease-in-out "
      />

      <div className="min-h-24 text-center flex flex-col justify-center max-w-full">
        <h3
          onClick={handleCardClick}
          title={movie.Title}
          className="font-bold text-md line-clamp-2 cursor-pointer hover:underline truncate "
        >
          {movie.Title} <span>({movie.Year})</span>
        </h3>

        <p className="text-sm text-gray-500">
          {movie.Type === "movie" ? "Película" : "Serie"}
        </p>

        <div className="flex flex-col justify-center items-center gap-y-2 mt-2">
          <StyledButton
            variant={isVista(movie.imdbID) ? "secondary" : "primary"}
            onClick={() => toggleVista(movie.imdbID)}
          >
            {isVista(movie.imdbID) ? "Quitar de vistas" : "Añadir a vistas"}
          </StyledButton>

          <StyledButton
            variant={isPendiente(movie.imdbID) ? "secondary" : "primary"}
            onClick={() => togglePendiente(movie.imdbID)}
          >
            {isPendiente(movie.imdbID)
              ? "Quitar de pendientes"
              : "Añadir a pendientes"}
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
