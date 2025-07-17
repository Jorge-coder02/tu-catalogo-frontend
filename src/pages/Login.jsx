/* eslint-disable no-unused-vars */
import LabeledInput from "../components/ui/LabeledInput.";
import Button from "../components/ui/Button.styles";
import { useReducer, useState } from "react";
import { login } from "../services/users";

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
      .then((data) => {
        console.log("✅ Login response:", data);
        setResponse(data);
        // Aquí puedes redirigir, guardar token, etc.
      })
      .catch((error) => {
        console.error("❌ Login error:", error.message);
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
        </div>
      </div>
    </div>
  );
}
