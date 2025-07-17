import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/header/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />
      <AppRoutes />
    </div>
  );
}
