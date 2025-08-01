import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
// Components
import LabeledInput from "../components/ui/LabeledInput.";
import Button from "../components/ui/Button.styles";
import LoadingSpinner from "../components/ui/LoadingSpinner";
// Redux store
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";
import { setVistas, setPendientes } from "../store/moviesSlice";
// Services
import { login } from "../services/users";
import { getPendings, getViews } from "../services/movies";

export default function Login() {
  const [response, setResponse] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [state, formDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_EMAIL":
          return { ...state, email: action.payload };
        case "SET_PASSWORD":
          return { ...state, password: action.payload };
        default:
          return state;
      }
    },
    { email: "", password: "" }
  );

  const handleLogin = async () => {
    // Validación simple
    if (!state.email || !state.password) {
      return;
    }
    dispatch(loginStart());
    // 🚀 Petición backend
    login(state.email, state.password)
      // ✅ Respuesta backend
      .then(async (data) => {
        setResponse(data.message);
        // guardar token y datos usuario en localStorage
        if (data.token) {
          dispatch(
            loginSuccess({ user: data.user.username, token: data.token })
          );

          // ✅ Obtener las películas vistas-pendientes y guardarlas en Redux
          try {
            const vistasData = await getViews(); // → hace fetch a /movies/vistas *vistasData y pendientesData cambiar mejor por userData
            dispatch(setVistas(vistasData.vistas));

            const pendientesData = await getPendings(); // → hace fetch a /movies/pendientes
            dispatch(setPendientes(pendientesData.pendientes));
          } catch (error) {
            console.error("Error al cargar películas vistas:", error);
          }

          // 🚀 Redirigir al home
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      // ❌ Error backend
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };

  return (
    <div
      className="flex justify-center pt-20 p-4 text-xl min-h-[calc(100dvh-64px)]
     bg-primary-bg text-primary-text dark:bg-primary-dark-bg dark:text-white"
    >
      {/* Contenedor principal */}
      <div className="flex flex-col items-center gap-4 w-full max-w-xl">
        <h1 className="text-2xl font-semibold">👨‍💼 Iniciar sesión</h1>
        {/* Formulario */}
        <div
          className=" flex flex-col items-center mt-4 w-full border-2 border-blue-400 dark:border-blue-800 py-14 px-6 rounded-lg shadow-lg
              gap-2 [&>input]:w-full [&>input]:p-2 [&>input]:border [&>input]:rounded-lg"
        >
          <LabeledInput
            id="email"
            label="Correo electrónico"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={state.email}
            onChange={(e) =>
              formDispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
          />
          <LabeledInput
            id="password"
            label="Contraseña"
            type="password"
            placeholder="********"
            value={state.password}
            onChange={(e) =>
              formDispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
          />
          <Button
            variant="primary"
            disabled={loading} // pendiente
            onClick={() => {
              handleLogin();
            }}
          >
            Iniciar sesión
          </Button>
          {error && <p className="text-red-600 text-[16px] mt-2">{error}</p>}
          {response && (
            <>
              <p className="text-blue-600 font-semibold text-[16px] mt-2">
                {response}
              </p>
              <p className="text-blue-600 text-sm mt-2">
                Redirigiendo a la página principal...
              </p>
              <div className="w-14 h-14">
                <LoadingSpinner delay={0} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
