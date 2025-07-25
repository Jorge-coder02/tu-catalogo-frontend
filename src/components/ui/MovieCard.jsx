import { useNavigate } from "react-router-dom";
import PosterImage from "./PosterImage";
import StyledButton from "./Button.styles";
import { useDispatch, useSelector } from "react-redux";
import {
  addToViews,
  removeFromViews,
  addToWatchlist,
  removeFromWatchlist,
} from "../../services/movies.js";
import {
  setVistas,
  removeVista,
  setPendientes,
  removePendiente,
} from "../../store/moviesSlice.js";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { vistas, pendientes } = useSelector((state) => state.movies);

  // Película vista 👀❔
  const isVista = vistas?.includes(movie.imdbID) || false;

  // Película pendiente 🕐❔
  const isPendiente = pendientes?.includes(movie.imdbID) || false;

  const handleCardClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  // 🎬🕐
  const handleAddToWatchlist = (imdbID) => {
    // 🚨 Verifica si el usuario está autenticado
    if (!user) {
      alert("Por favor, inicia sesión gestionar las películas pendientes.");
      // *aquí abrir modal de inicio de sesión*
      return;
    }
    // 🛠 Manejar si se pulsa Añadir o Quitar de pendientes
    // ✅ Añadir a pendientes
    if (!isPendiente) {
      addToWatchlist(imdbID)
        .then((response) => {
          if (response.alreadyAdded) {
            console.warn("La película ya estaba en pendientes.");
          } else {
            dispatch(setPendientes(response.pendientes)); // 🔥 ACTUALIZA REDUX
            console.log("Pendientes actualizados:", pendientes);
          }
        })
        .catch((error) => {
          console.error("Error al añadir película a pendientes:", error);
        });
    }
    // ❌ Quitar de pendientes
    else {
      removeFromWatchlist(imdbID)
        .then(() => {
          dispatch(removePendiente(imdbID)); // 🔥 ACTUALIZA REDUX
        })
        .catch((error) => {
          console.error("Error al quitar película de pendientes:", error);
        });
    }
  };

  // 🎬👀
  const handleAddToViews = (imdbID) => {
    // 🚨 Verifica si el usuario está autenticado
    if (!user) {
      alert("Por favor, inicia sesión gestionar las películas vistas.");
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
            console.log("Vistas actualizadas:", vistas);
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

  return (
    <div className="flex flex-col items-center border- border-blue-400 rounded-lg p-4 gap-3 w-full">
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
            variant={`${isPendiente ? "secondary" : "primary"}`}
            onClick={() => handleAddToWatchlist(movie.imdbID)}
          >
            {isPendiente ? "Quitar de pendientes" : "Añadir a pendientes"}
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
