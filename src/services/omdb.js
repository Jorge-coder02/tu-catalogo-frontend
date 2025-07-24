const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL;

export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();
  return data;
}

// Consulta API TMDB para más info e imágenes
export async function fetchTMDBMovieById(imdbID) {
  const res = await fetch(
    `https://api.themoviedb.org/3/find/${imdbID}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
  );
  const data = await res.json();
  return data.movie_results[0]; // Puede estar vacío si no lo encuentra
}

export async function getMovieById(imdbID) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al obtener la película");
  }
  return data;
}

// Get recent movies
// export async function getRecentMovies() {
//   const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=recent`);
//   const data = await res.json();
//   return data;
// }
