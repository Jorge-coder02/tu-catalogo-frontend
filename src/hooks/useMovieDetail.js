import { useState, useEffect } from "react";
import { getMovieById, fetchTMDBMovieById, getTrailer } from "../services/omdb";

export default function useMovieDetails(imdbID) {
  const [movie, setMovie] = useState(null); // Datos OMDB
  const [infoMovie, setInfoMovie] = useState(null); // Datos TMDB
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imdbID) return;

    let cancelled = false;
    const s = String(imdbID); // aseguramos que siempre sea string
    const tipo = s.startsWith("tt") ? "omdb" : "tmdb";

    const fetchAll = async () => {
      try {
        setLoading(true);

        if (tipo === "omdb") {
          // OMDB → datos base
          const movieData = await getMovieById(s);
          if (!cancelled) setMovie(movieData);

          if (movieData) {
            // TMDB → info adicional
            const tmdbData = await fetchTMDBMovieById(s);
            if (!cancelled) setInfoMovie(tmdbData);

            // Trailer
            const trailerUrl = await getTrailer(s);
            if (!cancelled) setMovieTrailer(trailerUrl);
          }
        } else {
          // TMDB → info completa
          console.log("▶️ Caso TMDB, id recibido:", s);
          const tmdbData = await fetchTMDBMovieById(s);
          console.log("📦 Datos TMDB devueltos:", tmdbData);
          if (!cancelled) setInfoMovie(tmdbData);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, [imdbID]);

  return {
    movie,
    infoMovie,
    movieTrailer,
    loading,
  };
}
