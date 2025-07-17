import PosterImage from "./PosterImage";
import StyledButton from "./Button.styles";

export default function MovieCard({ movie }) {
  return (
    <div className="flex flex-col items-center border-2 border-blue-400 rounded-lg p-4 gap-3 w-full cursor-pointer">
      <PosterImage src={movie.Poster} alt={movie.Title} />

      <div className="min-h-24 text-center flex flex-col justify-center">
        <h3 className="font-bold text-md line-clamp-2">
          {movie.Title} <span>({movie.Year})</span>
        </h3>
        <p className="text-sm text-gray-600"></p>
        <p className="text-sm text-gray-500">
          {movie.Type === "movie" ? "Película" : "Serie"}
        </p>
        <div className="flex flex-col justify-center items-center gap-y-2 mt-2">
          <StyledButton variant="primary" onClick={() => console.log(movie)}>
            Añadir a vistas
          </StyledButton>
          <StyledButton variant="secondary" onClick={() => console.log(movie)}>
            Añadir a pendientes
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
