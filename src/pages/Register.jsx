/* eslint-disable no-unused-vars */
import LabeledInput from "../components/ui/LabeledInput.";
import Button from "../components/ui/Button.styles";
import { useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import { register } from "../services/users";
import validarDatos from "../utils/validarDatos";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { randomString, randomEmail } from "../utils/randomData";

export default function Register() {
  const [error_resp, setErrorResp] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erroresPorCampo, setErroresPorCampo] = useState({});
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_USERNAME":
          return { ...state, username: action.payload };
        case "SET_EMAIL":
          return { ...state, email: action.payload };
        case "SET_PASSWORD":
          return { ...state, password: action.payload };
        case "SET_PASSWORD_REPEAT":
          return { ...state, password_repeat: action.payload };
        default:
          return state;
      }
    },
    { email: "", password: "", username: "", password_repeat: "" }
  );

  const autocompletarDatos = () => {
    // Generar cadenas aleatorias

    const username = `user${randomString(6)}`;
    const email = randomEmail();
    const password = randomString(10);

    dispatch({ type: "SET_USERNAME", payload: username });
    dispatch({ type: "SET_EMAIL", payload: email });
    dispatch({ type: "SET_PASSWORD", payload: password });
    dispatch({ type: "SET_PASSWORD_REPEAT", payload: password });
  };

  const handleRegister = async () => {
    // ❌ Validar errores
    const errores = validarDatos(state);

    if (errores) {
      setErroresPorCampo(errores); // { email: "", password: "", ... }
      return;
    }

    // ✅ Si todo bien:
    setErroresPorCampo({});

    // 🚀 Petición backend
    setErrorResp(null);
    setLoading(true);
    register(state.email, state.password, state.username)
      .then((data) => {
        setResponse(data);
        setTimeout(() => {
          navigate("/login"); // Redirigir después de 3.5 segundos
        }, 3500);
      })
      .catch((error) => {
        console.error("❌ Register error:", error.message);
        setResponse(null);
        setErrorResp(error.message); // Este mensaje ya viene del backend
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center pt-20 p-4 text-xl min-h-[calc(100dvh-64px)]">
      {/* Contenedor principal */}
      <div className="flex flex-col items-center gap-4 w-full max-w-xl">
        <h1 className="text-2xl font-semibold">👨‍💼 Registro</h1>
        {/* Formulario */}
        <div
          className="flex flex-col items-center mt-4 w-full border-2 border-blue-400 dark:border-blue-800 py-14 px-6 rounded-lg shadow-lg
              gap-2 [&>input]:w-full [&>input]:p-2 [&>input]:border [&>input]:rounded-lg
                bg-primary-bg text-primary-text dark:bg-primary-dark-bg dark:text-white"
        >
          <LabeledInput
            id="username"
            label="Nombre de usuario"
            type="text"
            placeholder="usuariofeliz123"
            value={state.username}
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
            error={erroresPorCampo.username}
          />
          <LabeledInput
            id="email"
            label="Correo electrónico"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
            error={erroresPorCampo.email}
          />
          <LabeledInput
            id="password"
            label="Contraseña"
            type="password"
            placeholder="********"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD", payload: e.target.value })
            }
            error={erroresPorCampo.password}
          />
          <LabeledInput
            id="password_repeat"
            label="Repetir contraseña"
            type="password"
            placeholder="********"
            value={state.password_repeat}
            onChange={(e) =>
              dispatch({ type: "SET_PASSWORD_REPEAT", payload: e.target.value })
            }
            error={erroresPorCampo.password_repeat}
          />
          {/* Botón iniciar sesión */}
          <Button
            className={`${response ? "opacity-50 pointer-events-none" : ""}`}
            variant="primary"
            onClick={() => {
              setLoading(true);
              handleRegister();
            }}
          >
            Registrarme
          </Button>
          <Button variant="secondary" onClick={() => autocompletarDatos()}>
            Autocompletado de datos
          </Button>
          {error_resp && (
            <p className="text-red-600 text-[16px] mt-2">{error_resp}</p>
          )}
          {response && (
            <>
              <p className="text-green-600 text-[18px] font-semibold mt-2">
                {response.message || "Bienvenido!"}
              </p>
              <div className="text-center text-blue-600 text-[16px] font-semibold">
                <p>{"Redirigiendo a login..."}</p>
              </div>
              {
                <div className="w-14 h-14">
                  <LoadingSpinner delay={0} />
                </div>
              }
            </>
          )}
        </div>
      </div>
    </div>
  );
}
