/* eslint-disable no-unused-vars */
import LabeledInput from "../components/ui/LabeledInput.";
import Button from "../components/ui/Button.styles";
import { useReducer, useState } from "react";
import { login } from "../services/users";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function Login() {
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(
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
      setError("Por favor, completa todos los campos.");
      return;
    }
    // 🚀 Petición backend
    setError(null);
    setLoading(true);
    login(state.email, state.password)
      // ✅ Respuesta backend
      .then((data) => {
        setResponse(data.message);
        // guardar token y usuario en localStorage
        if (data.token) {
          // loginContext(data.user, data.token); // actualizamos contexto y localStorage
        }
      })
      // ❌ Error backend
      .catch((error) => {
        console.log("Respuesta del backend:", error);
        setError(error.message); // Este mensaje ya viene del backend
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center pt-20 p-4 text-xl min-h-[calc(100dvh-64px)]">
      {/* Contenedor principal */}
      <div className="flex flex-col items-center gap-4 w-full max-w-xl">
        <h1 className="text-2xl font-semibold">👨‍💼 Iniciar sesión</h1>
        {/* Formulario */}
        <div
          className="bg-white flex flex-col items-center mt-4 w-full border-2 border-blue-400 py-14 px-6 rounded-lg shadow-lg
              gap-2 [&>input]:w-full [&>input]:p-2 [&>input]:border [&>input]:rounded-lg"
        >
          <LabeledInput
            id="email"
            label="Correo electrónico"
            type="email"
            placeholder="usuario@ejemplo.com"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "SET_EMAIL", payload: e.target.value })
            }
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
          />
          <Button
            variant="primary"
            disabled={loading} // pendiente
            onClick={() => {
              setLoading(true);
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
