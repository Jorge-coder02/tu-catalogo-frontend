export default function validarDatos(state) {
  const errores = {};

  if (!state.email) {
    errores.email = "El correo electrónico es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) {
    errores.email = "El correo electrónico no es válido.";
  }

  if (!state.username) {
    errores.username = "El nombre de usuario es obligatorio.";
  } else if (state.username.length < 6) {
    errores.username = "El nombre de usuario debe tener al menos 6 caracteres.";
  }

  if (!state.password) {
    errores.password = "La contraseña es obligatoria.";
  } else if (state.password.length < 6) {
    errores.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  if (!state.password_repeat) {
    errores.password_repeat = "Repite tu contraseña.";
  } else if (state.password !== state.password_repeat) {
    errores.password_repeat = "Las contraseñas no coinciden.";
  }

  return Object.keys(errores).length > 0 ? errores : null;
}
