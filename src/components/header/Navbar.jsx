import NavItem from "./NavItem";
import Button from "../ui/Button.styles";
import MobileNavbar from "./MobileNavbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import ThemeButton from "../ui/ThemeButton";

import UserDropdown from "./UserDropdown"; // Dropdown profile menu

function Navbar() {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    dispatch(logout());
  };

  return (
    <>
      <header
        className="hidden justify-evenly shadow md:flex
                   bg-primary-bg text-primary-text dark:bg-secondary-dark-bg dark:text-primary-dark-text"
      >
        <div className="flex justify-center items-center p-4">
          <NavItem className={"text-xl"} href="/" label="Tu Catálogo" />
        </div>
        <nav className="flex items-center justify-center space-x-8 p-4">
          <NavItem href="/" label="Inicio" />
          <NavItem href="/search" label="Explorar" />
          {user && <NavItem href="/dashboard" label="Mi lista" />}
        </nav>
        <div className="flex items-center justify-center space-x-4 p-4">
          {user ? (
            <UserDropdown
              user={user}
              handleLogout={handleLogout}
            ></UserDropdown>
          ) : (
            <>
              <ThemeButton theme={theme}></ThemeButton> {/* ☀Light/Dark mode */}
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
