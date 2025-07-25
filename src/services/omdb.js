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

export async function getTrailer(imdbID) {
  // 1. Buscar el movie_id en TMDb usando el imdbID
  const findRes = await fetch(
    `https://api.themoviedb.org/3/find/${imdbID}?api_key=${TMDB_API_KEY}&external_source=imdb_id`
  );
  const findData = await findRes.json();

  if (!findRes.ok) {
    throw new Error(
      findData.status_message || "Error al buscar la película en TMDb"
    );
  }

  // Extraer el TMDb movie id (puede estar en movie_results o tv_results)
  const movieResult = findData.movie_results[0] || findData.tv_results[0];
  if (!movieResult) {
    throw new Error("Película no encontrada en TMDb");
  }

  const tmdbId = movieResult.id;

  // 2. Obtener los videos asociados a ese movie_id
  const videosRes = await fetch(
    `https://api.themoviedb.org/3/movie/${tmdbId}/videos?api_key=${TMDB_API_KEY}`
  );
  const videosData = await videosRes.json();

  if (!videosRes.ok) {
    throw new Error(
      videosData.status_message || "Error al obtener videos de la película"
    );
  }

  // 3. Buscar el trailer en YouTube
  const trailer = videosData.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  if (!trailer) {
    throw new Error("Trailer no disponible");
  }

  // 4. Retornar la URL del trailer
  return `https://www.youtube.com/watch?v=${trailer.key}`;
}

// Get recent movies
// export async function getRecentMovies() {
//   const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=recent`);
//   const data = await res.json();
//   return data;
// }
