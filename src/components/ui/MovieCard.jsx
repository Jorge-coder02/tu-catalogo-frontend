import { useNavigate } from "react-router-dom";
import PosterImage from "./PosterImage";
import StyledButton from "./Button.styles";
import { useDispatch, useSelector } from "react-redux";
import { addToViews, removeFromViews } from "../../services/movies.js";
import { setVistas, removeVista } from "../../store/moviesSlice.js";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const vistas = useSelector((state) => state.movies.vistas);
  const isVista = vistas.includes(movie.imdbID);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleCardClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const handleAddToViews = (imdbID) => {
    // 🚨 Verifica si el usuario está autenticado
    if (!user) {
      alert("Por favor, inicia sesión para añadir a vistas.");
      // *aquí abrir modal de inicio de sesión*
      return;
    }
    // 🛠 Manejar si se pulsa Añadir o Quitar de vistas
    // ✅ Añadir a vistas
    if (!isVista) {
      addToViews(imdbID)
        .then((response) => {
          if (response.alreadyAdded) {
            console.warn("La película ya estaba en vistas.");
          } else {
            dispatch(setVistas(response.vistas)); // 🔥 ACTUALIZA REDUX
          }
        })
        .catch((error) => {
          console.error("Error al añadir película a vistas:", error);
        });
    }
    // ❌ Quitar de vistas
    else {
      removeFromViews(imdbID)
        .then(() => {
          dispatch(removeVista(imdbID)); // 🔥 ACTUALIZA REDUX
        })
        .catch((error) => {
          console.error("Error al quitar película de vistas:", error);
        });
    }
  };

  const handleAddToWatchlist = (movie) => {
    if (!user) {
      alert("Por favor, inicia sesión para añadir a pendientes.");
      return;
    }
    // Aquí puedes implementar la lógica para añadir a pendientes
    console.log("Añadido a pendientes:", movie);
  };

  return (
    <div className="flex flex-col items-center border-2 border-blue-400 rounded-lg p-4 gap-3 w-full">
      <PosterImage
        onClick={handleCardClick}
        src={movie.Poster}
        alt={movie.Title}
        className="cursor-pointer"
      />

      <div className="min-h-24 text-center flex flex-col justify-center">
        <h3
          onClick={handleCardClick}
          className="font-bold text-md line-clamp-2 cursor-pointer hover:underline"
        >
          {movie.Title} <span>({movie.Year})</span>
        </h3>
        <p className="text-sm text-gray-600"></p>
        <p className="text-sm text-gray-500">
          {movie.Type === "movie" ? "Película" : "Serie"}
        </p>
        <div className="flex flex-col justify-center items-center gap-y-2 mt-2">
          <StyledButton
            variant={`${isVista ? "secondary" : "primary"}`}
            onClick={() => handleAddToViews(movie.imdbID)}
          >
            {isVista ? "Quitar de vistas" : "Añadir a vistas"}
          </StyledButton>
          <StyledButton
            variant="secondary"
            onClick={() => handleAddToWatchlist(movie)}
          >
            Añadir a pendientes
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
