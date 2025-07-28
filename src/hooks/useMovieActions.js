import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToViews,
  removeFromViews,
  addToWatchlist,
  removeFromWatchlist,
} from "../services/movies";
import {
  setVistas,
  removeVista,
  setPendientes,
  removePendiente,
} from "../store/moviesSlice";

export default function useMovieActions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { vistas, pendientes } = useSelector((state) => state.movies);

  const isVista = (imdbID) => vistas?.includes(imdbID);
  const isPendiente = (imdbID) => pendientes?.includes(imdbID);

  const checkAuth = () => {
    if (!user) {
      alert("Debes iniciar sesión.");
      navigate("/login");
      return false;
    }
    return true;
  };

  const toggleVista = async (imdbID) => {
    if (!checkAuth()) return;

    if (isVista(imdbID)) {
      await removeFromViews(imdbID);
      dispatch(removeVista(imdbID));
    } else {
      const res = await addToViews(imdbID);
      if (!res.alreadyAdded) dispatch(setVistas(res.vistas));
    }
  };

  const togglePendiente = async (imdbID) => {
    if (!checkAuth()) return;

    if (isPendiente(imdbID)) {
      await removeFromWatchlist(imdbID);
      dispatch(removePendiente(imdbID));
    } else {
      const res = await addToWatchlist(imdbID);
      if (!res.alreadyAdded) dispatch(setPendientes(res.pendientes));
    }
  };

  return {
    isVista,
    isPendiente,
    toggleVista,
    togglePendiente,
  };
}
