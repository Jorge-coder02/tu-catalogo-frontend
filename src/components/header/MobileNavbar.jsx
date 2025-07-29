import NavItem from "./NavItem";
import Button from "../ui/Button.styles";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import ThemeButton from "../ui/ThemeButton";

import UserDropdown from "./UserDropdown"; // Dropdown profile menu

function MobileNavbar() {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    dispatch(logout());
  };

  return (
    <header
      className="w-full relative
      bg-primary-bg text-primary-text dark:bg-secondary-dark-bg dark:text-primary-dark-text"
    >
      <div className="flex justify-between items-center p-4 shadow ">
        {/* Logo or Title */}
        <NavItem className={"text-xl"} href="/" label="Tu Catálogo" />
        {/* Hamburger Menu */}
        <button
          className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
          onClick={() => setOpen((open) => !open)}
          aria-label="Abrir menú"
        >
          <span className="block w-6 h-0.5 bg-gray-700 dark:bg-primary-bg mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700 dark:bg-primary-bg mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700 dark:bg-primary-bg"></span>
        </button>
      </div>
      {/* Dropdown Menu */}
      {open && (
        <div
          className="bg-white shadow-md absolute top-16 left-0 w-full z-50 
          bg-primary-bg text-primary-text dark:bg-secondary-dark-bg dark:text-primary-dark-text"
        >
          <nav className="flex flex-col items-center space-y-4 p-4">
            <NavItem href="/" label="Inicio" />
            <NavItem href="/search" label="Explorar" />
            {user && <NavItem href="/dashboard" label="Mi lista" />}
            {/* <NavItem href="/dashboard" label="Dashboard" />
            <NavItem href="/search" label="Buscar" /> */}
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex items-center justify-center space-x-4 p-4">
                {user ? (
                  <div className="flex flex-col items-center justify-center gap-y-4">
                    <ThemeButton
                      className={"py-1.5 mx-10"}
                      theme={theme}
                    ></ThemeButton>
                    <UserDropdown
                      className={"w-20"}
                      user={user}
                      handleLogout={handleLogout}
                    ></UserDropdown>
                  </div>
                ) : (
                  <div className="flex flex-col gap-y-4">
                    <ThemeButton
                      className={"py-1.5 mx-10"}
                      theme={theme}
                    ></ThemeButton>{" "}
                    <div className="flex gap-x-3">
                      <NavItem href="/login">
                        <Button>Iniciar sesión</Button>
                      </NavItem>
                      <NavItem href="/register">
                        <Button
                          variant="secondary"
                          className="bg-blue-500 text-white"
                        >
                          Registro
                        </Button>
                      </NavItem>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default MobileNavbar;
