import { useNavigate } from "react-router-dom";
import PosterImage from "./PosterImage";
import IconCornerButton from "./IconCornerButton";
import { useEffect } from "react";

export default function MovieCardTMDB({ movie }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Usamos el id de TMDB
    navigate(`/movie/${movie.id}`);
  };

  useEffect(() => {
    console.log("📦 Datos de la película:", movie.id);
  }, [movie]);

  return (
    <div className="flex flex-col items-center rounded-lg p-4 gap-3 w-full">
      {/* Imagen + botones */}
      <div className="relative w-full max-w-[200px] aspect-[2/3] overflow-hidden rounded-md">
        <PosterImage
          onClick={handleCardClick}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.jpg"
          }
          alt={movie.title}
          className="cursor-pointer transition-all ease-in-out"
        />
        <IconCornerButton
          movieId={movie.id}
          type="vista"
          className="top-2 right-2"
        />
        <IconCornerButton
          movieId={movie.id}
          type="pendiente"
          className="top-2 left-2"
        />
      </div>

      {/* Info */}
      <div className="min-h-24 text-center flex flex-col justify-center w-full max-w-[200px]">
        <h3
          onClick={handleCardClick}
          title={movie.title}
          className="font-bold text-md line-clamp-2 cursor-pointer hover:underline truncate"
        >
          {movie.title}{" "}
          {movie.release_date && (
            <span>({movie.release_date.slice(0, 4)})</span>
          )}
        </h3>
        <p className="text-sm text-gray-500">
          Película{/* Puedes ampliar para soportar series */}
        </p>
      </div>
    </div>
  );
}
