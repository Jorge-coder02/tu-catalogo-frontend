import { newMovies } from "../services/omdb";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { searchMoviesByCategory } from "../services/omdb";
import MovieCardTmdb from "../components/ui/MovieCardTmdb";
import CategoryBar from "../components/ui/CategoryBar";

function Explore() {
  const [data, setData] = useState([]);
  const { categoriaSeleccionada } = useSelector((state) => state.movies);

  useEffect(() => {
    const fetchData = async () => {
      const response = await newMovies();
      setData(Array.isArray(response) ? response : response.Search || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(categoriaSeleccionada);
    // Llamar a la API o filtrar los datos según la categoría seleccionada
    const fetchCategoryData = async () => {
      if (categoriaSeleccionada === "all") {
        const response = await newMovies();
        setData(Array.isArray(response) ? response : response.Search || []);
      } else {
        // Obtener id
        let categoryId;
        switch (categoriaSeleccionada) {
          case "Accion":
            categoryId = 28; // Acción
            break;
          case "Comedia":
            categoryId = 35; // Comedia
            break;
          case "Drama":
            categoryId = 18;
            break;
          case "Terror":
            categoryId = 27; // Terror
            break;
          case "Romántico":
            categoryId = 10749; // Romántico
            break;
          case "Psicológico":
            categoryId = 9648; // Psicológico
            break;
          default:
            categoryId = null;
        }
        if (categoryId) {
          const response = await searchMoviesByCategory(categoryId);
          setData(Array.isArray(response) ? response : response.Search || []);
        } else {
          setData([]);
        }
      }
    };
    fetchCategoryData();
  }, [categoriaSeleccionada]);

  return (
    <div className="min-h-[calc(100dvh-64px)] pt-16 container mx-auto p-4">
      <div className="flex flex-col justify-center items-center">
        {/* Título */}
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-4">Explorar</h1>
          <p className="text-center">
            Aquí puedes encontrar películas y series destacas, separadas por
            categorías.
          </p>
          {/* Barra categorías */}
          <div className="w-full max-w-md md:max-w-full mt-16 mb-6">
            <CategoryBar />
          </div>
        </div>
        {/* Mostrar películas */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt">
          {data &&
            data.map((movie) => <MovieCardTmdb key={movie.id} movie={movie} />)}
        </div>
      </div>
    </div>
  );
}

export default Explore;
