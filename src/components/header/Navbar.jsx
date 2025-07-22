import NavItem from "./NavItem";
import Button from "../ui/Button.styles";
import MobileNavbar from "./MobileNavbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

function Navbar() {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    dispatch(logout());
  };

  return (
    <>
      <header className="hidden justify-evenly bg-white shadow md:flex">
        <div className="flex justify-center items-center p-4">
          <h1 className="text-center text-2xl font-bold text-gray-800">
            Tu Catálogo
          </h1>
        </div>
        <nav className="flex items-center justify-center space-x-8 p-4 text-gray-700">
          <NavItem href="/" label="Inicio" />
          <NavItem href="/dashboard" label="Dashboard" />
          <NavItem href="/search" label="Buscar" />
        </nav>
        <div className="flex items-center justify-center space-x-4 p-4">
          {user ? (
            <>
              <span className="text-gray-800 text-sm">{user}</span>
              <Button variant="danger" onClick={() => handleLogout()}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button>Iniciar sesión</Button>
              </Link>
              <Link to="/register">
                <Button variant="secondary" className="bg-blue-500 text-white">
                  Registro
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>
      <header className="flex md:hidden">
        <MobileNavbar />
      </header>
    </>
  );
}

export default Navbar;
