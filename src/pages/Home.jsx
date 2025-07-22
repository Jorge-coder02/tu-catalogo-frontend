import { searchMovies } from "../services/omdb";
import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { setTerm, setResults, setStatus } from "../store/searchSlice";
// Comps
import MovieCard from "../components/ui/MovieCard";
import Button from "../components/ui/Button.styles";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function Home() {
  const dispatch = useDispatch();
  const { term, results, status } = useSelector((state) => state.search);

  const handleSearch = async (query) => {
    console.log("Realizando búsqueda para:", query);
    dispatch(setTerm(query));
    dispatch(setStatus("loading"));
    const results = await searchMovies(query);
    dispatch(setResults(results.Search || []));
    dispatch(setStatus("succeeded"));
  };

  useEffect(() => {
    if (term && results.length === 0) {
      console.log("Rehaciendo búsqueda para:", term);
      handleSearch(term);
    }
    // eslint-disable-next-line
  }, []);

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
            className="border p-2 rounded"
            placeholder="Buscar películas..."
            type="text"
            defaultValue={term}
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
            <h2 className="text-2xl font-bold">🎬 Resultados de búsqueda</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
              {results.map((movie) => (
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
