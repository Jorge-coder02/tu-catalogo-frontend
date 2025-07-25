const BASE_URL =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:5000/api";

// 🎬🕐 Obtener pendientes
export async function getPendings() {
  const token = localStorage.getItem("token"); // recoger token
  if (!token) {
    throw new Error("No estás autenticado. Por favor, inicia sesión.");
  }
  const res = await fetch(`${BASE_URL}/movies/pendientes`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // JWT
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al obtener pendientes"); // ❌ Lanza el mensaje del backend como error
  }

  return data;
}

// 🎬➕🕐 Añadir película a pendientes
export async function addToWatchlist(imdbID) {
  const token = localStorage.getItem("token"); // recoger token
  if (!token) {
    throw new Error("No estás autenticado. Por favor, inicia sesión.");
  }

  const res = await fetch(`${BASE_URL}/movies/pendientes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT
    },
    body: JSON.stringify({
      imdbID,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al añadir película a pendientes"); // ❌ Lanza el mensaje del backend como error
  }

  return data;
}

// 🎬🕐❌ Quitar película de pendientes
export async function removeFromWatchlist(imdbID) {
  const token = localStorage.getItem("token"); // recoger token
  if (!token) {
    throw new Error("No estás autenticado. Por favor, inicia sesión.");
  }
  const res = await fetch(`${BASE_URL}/movies/pendientes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT
    },
    body: JSON.stringify({
      imdbID,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al quitar película de pendientes"); // ❌ Lanza el mensaje del backend como error
  }

  return data;
}

// 🎬👀➕ Añadir película a vistas
export async function addToViews(imdbID) {
  const token = localStorage.getItem("token"); // recoger token
  if (!token) {
    throw new Error("No estás autenticado. Por favor, inicia sesión.");
  }
  const res = await fetch(`${BASE_URL}/movies/vistas`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT
    },
    body: JSON.stringify({
      imdbID,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al añadir película a vistas"); // ❌ Lanza el mensaje del backend como error
  }

  return data;
}

// 🎬👀❌ Quitar película de vistas
export async function removeFromViews(imdbID) {
  const token = localStorage.getItem("token"); // recoger token
  if (!token) {
    throw new Error("No estás autenticado. Por favor, inicia sesión.");
  }
  const res = await fetch(`${BASE_URL}/movies/vistas`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // JWT
    },
    body: JSON.stringify({
      imdbID,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al quitar película de vistas"); // ❌ Lanza el mensaje del backend como error
  }

  return data;
}

// 🎬👀 Obtener vistas
export async function getViews() {
  const token = localStorage.getItem("token"); // recoger token
  if (!token) {
    throw new Error("No estás autenticado. Por favor, inicia sesión.");
  }
  const res = await fetch(`${BASE_URL}/movies/vistas`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // JWT
    },
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al obtener vistas"); // ❌ Lanza el mensaje del backend como error
  }

  return data;
}
