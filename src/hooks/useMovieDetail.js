import { useState, useEffect } from "react";
import { getMovieById, fetchTMDBMovieById, getTrailer } from "../services/omdb";

export default function useMovieDetails(imdbID) {
  const [movie, setMovie] = useState(null); // OMDB
  const [infoMovie, setInfoMovie] = useState(null); // TMDB
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imdbID) return;

    const fetchAll = async () => {
      try {
        const movieData = await getMovieById(imdbID);
        setMovie(movieData);

        if (movieData) {
          const tmdbData = await fetchTMDBMovieById(imdbID);
          setInfoMovie(tmdbData);

          const trailerUrl = await getTrailer(imdbID);
          setMovieTrailer(trailerUrl);
        }
      } catch (err) {
        console.error("Error al obtener detalles de la película:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [imdbID]);

  return {
    movie,
    infoMovie,
    movieTrailer,
    loading,
  };
}
