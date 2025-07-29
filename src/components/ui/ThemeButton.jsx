import { useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";

function ThemeButton({ theme, className }) {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={`px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 ${className}`}
    >
      {theme === "dark" ? "☀️ (Beta)" : "🌙 (Beta)"}
    </button>
  );
}

export default ThemeButton;
