const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000/api";

// 👨‍💼 Login de usuario
export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/users/login`, {
    // http://localhost:5000/api/users/login
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al iniciar sesión"); // ❌ Lanza el mensaje del backend como error
  }

  return data;
}

// 👨‍💼➕ Registro de usuario
export async function register(email, password, username) {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al registrar usuario"); // ❌ Lanza el mensaje del backend como error
  }
  return data;
}
