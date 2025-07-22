const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_OMDB_BASE_URL;

export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();
  return data;
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
