import useMovieActions from "../../hooks/useMovieActions";

function IconCornerButton({ movieId, type, className = "" }) {
  const { isVista, isPendiente, toggleVista, togglePendiente } =
    useMovieActions();

  const isActive = type === "vista" ? isVista(movieId) : isPendiente(movieId);

  const handleClick = (e) => {
    e.stopPropagation();
    if (type === "vista") {
      toggleVista(movieId);
    } else {
      togglePendiente(movieId);
    }
  };

  const label =
    type === "vista"
      ? isActive
        ? "✓ Vista"
        : "Marcar vista"
      : isActive
      ? "⏳ Pendiente"
      : "Marcar pendiente";

  const label_mobile =
    type === "vista" ? (isActive ? "✓" : "➕") : isActive ? "⏳" : "🕐";

  return (
    <button
      onClick={handleClick}
      className={`absolute bg-[#f5f5f5] hover:bg-gray-200 dark:hover:bg-gray-500 dark:bg-gray-700 dark:text-white rounded-md shadow md:p-1 p-2 text-xs transition ${className}`}
    >
      {/* Visible en escritorio */}
      <span className="hidden sm:inline">{label}</span>

      {/* Visible en móvil */}
      <span className="inline sm:hidden">{label_mobile}</span>
    </button>
  );
}

export default IconCornerButton;
