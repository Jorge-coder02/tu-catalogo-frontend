import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieById } from "../services/omdb";

export default function MovieDetail() {
  const { id } = useParams(); // este es el imdbID
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await getMovieById(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Error al obtener la película:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Cargando...</div>;

  return (
    <div className="p-4">
      <button className="text-blue-600 mb-4" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <h1 className="text-2xl font-bold mb-2">
        {movie.Title} ({movie.Year})
      </h1>
      <img src={movie.Poster} alt={movie.Title} className="w-48 mb-4" />
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
        <strong>Sinopsis:</strong> {movie.Plot}
      </p>
      <p>
        <strong>IMDb:</strong> {movie.imdbRating}
      </p>
    </div>
  );
}
