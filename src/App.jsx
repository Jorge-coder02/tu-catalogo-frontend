import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/header/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function App() {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-[calc(100dvh-64px)] bg-[#f5f5f5] text-primary-text dark:bg-primary-dark-bg dark:text-white">
      <Navbar />
      <AppRoutes />
    </div>
  );
}
