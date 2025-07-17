import { searchMovies } from "../services/omdb";
import { useState } from "react";
import MovieCard from "../components/ui/MovieCard";
import Button from "../components/ui/Button.styles";

export default function Home() {
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const query = document.querySelector('input[type="text"]').value;
    console.log(query);
    const results = await searchMovies(query);
    console.log(results.Search);
    setResults(results.Search || []);
  };

  return (
    <div className="min-h-[calc(100dvh-64px)] pt-16 container mx-auto p-4">
      {/* Contenedor principal */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">🏠 Página de inicio</h1>
        <p className="text-center mt-4">
          Bienvenido a tu catálogo de películas. Aquí podrás buscar y explorar
          tus películas favoritas.
        </p>
        {/* 🔎 Búsqueda */}
        <div className="flex flex-col justify-center gap-y-4 mt-8 w-full max-w-sm">
          <h2 className="text-center text-2xl font-bold">
            🔍 Búsqueda de películas
          </h2>
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Buscar películas..."
          />
          <div className="flex justify-center ">
            <Button variant="secondary" onClick={handleSearch}>
              Buscar
            </Button>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold">🎬 Resultados de búsqueda</h2>
          {/* 📋 Resultados de la búsqueda */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {results &&
              results.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
