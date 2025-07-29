import { useNavigate } from "react-router-dom";
import PosterImage from "./PosterImage";
import IconCornerButton from "./IconCornerButton";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  return (
    <div className="flex flex-col items-center rounded-lg p-4 gap-3 w-full">
      {/* Imagen + botones */}
      <div className="relative w-full max-w-[200px] aspect-[2/3] overflow-hidden rounded-md">
        <PosterImage
          onClick={handleCardClick}
          src={movie.Poster}
          alt={movie.Title}
          className="cursor-pointer transition-all ease-in-out"
        />
        <IconCornerButton
          movieId={movie.imdbID}
          type="vista"
          className="top-2 right-2"
        />
        <IconCornerButton
          movieId={movie.imdbID}
          type="pendiente"
          className="top-2 left-2"
        />
      </div>

      {/* Info */}
      <div className="min-h-24 text-center flex flex-col justify-center w-full max-w-[200px]">
        <h3
          onClick={handleCardClick}
          title={movie.Title}
          className="font-bold text-md line-clamp-2 cursor-pointer hover:underline truncate"
        >
          {movie.Title} <span>({movie.Year})</span>
        </h3>
        <p className="text-sm text-gray-500">
          {movie.Type === "movie" ? "Película" : "Serie"}
        </p>
      </div>
    </div>
  );
}
