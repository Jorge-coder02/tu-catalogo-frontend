import { searchMovies } from "../services/omdb";
import { useEffect, useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setTerm, setResults, setStatus } from "../store/searchSlice";
// Comps
import MovieCard from "../components/ui/MovieCard";
import Button from "../components/ui/Button.styles";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import CategoryButton from "../components/ui/CategoryButton";

export default function Home() {
  const dispatch = useDispatch();
  const { term, results, status } = useSelector((state) => state.search);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = async (query) => {
    if (!query || query.trim() === "") {
      console.warn("Búsqueda vacía, no se realizará ninguna acción.");
      return;
    }
    dispatch(setTerm(query));
    dispatch(setStatus("loading"));
    const results = await searchMovies(query);
    dispatch(setResults(results.Search || []));
    dispatch(setStatus("succeeded"));
  };

  useEffect(() => {
    if (term && results.length === 0) {
      handleSearch(term);
    }
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e) => {
    dispatch(setTerm(e.target.value));
  };

  return (
    <div className="min-h-[calc(100dvh-64px)] pt-16 container mx-auto p-4">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">🏠 Página de inicio</h1>
        <p className="text-center mt-4">
          Bienvenido a tu catálogo. Aquí podrás buscar y explorar tus películas
          y series favoritas.
        </p>

        <div className="flex flex-col justify-center gap-y-4 mt-8 w-full max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-none">
            🔍 Búsqueda de películas
            <br />
            <span className="text-gray-500 text-sm">
              {" "}
              (Por su nombre original)
            </span>
          </h2>
          <input
            className="border px-4 py-2 rounded"
            placeholder="Inception..."
            type="text"
            value={term}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(e.target.value);
            }}
          />
          <Button className="mx-8" onClick={() => handleSearch(term)}>
            Buscar
          </Button>
        </div>
        {/* 📋 Resultados de la búsqueda */}
        {status === "succeeded" && (
          <div className="mt-12">
            <div className="flex md:flex-row flex-col space-y-2 items-center gap-x-8">
              <h2 className="text-2xl font-bold">🎬 Resultados de búsqueda</h2>
              {/* Pelis/Series */}
              <div className="flex items-center gap-x-4 border px-4 py-2">
                <CategoryButton
                  value="Películas"
                  selectedCategory={selectedCategory}
                  onClick={setSelectedCategory}
                />
                <span className="text-gray-400">|</span>
                <CategoryButton
                  value="Series"
                  selectedCategory={selectedCategory}
                  onClick={setSelectedCategory}
                />
                <span className="text-gray-400">|</span>
                <CategoryButton
                  value="Todos"
                  selectedCategory={selectedCategory}
                  onClick={setSelectedCategory}
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {results
                .filter((movie) => {
                  if (selectedCategory === "all") return true;
                  if (selectedCategory === "movies")
                    return movie.Type === "movie";
                  if (selectedCategory === "series")
                    return movie.Type === "series";
                  return true; // fallback
                })
                .map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </div>
          </div>
        )}
        {status === "loading" && (
          <div className="flex justify-center mt-4">
            <LoadingSpinner delay={0} />
          </div>
        )}
      </div>
    </div>
  );
}
