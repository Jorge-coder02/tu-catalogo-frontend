import NavItem from "./NavItem";
import Button from "../ui/Button.styles";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

import UserDropdown from "./UserDropdown"; // Dropdown profile menu

function MobileNavbar() {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    dispatch(logout());
  };

  return (
    <header className="w-full relative">
      <div className="flex justify-between items-center p-4 bg-white shadow">
        {/* Logo or Title */}
        <div className="text-lg font-bold">Tu Catálogo</div>
        {/* Hamburger Menu */}
        <button
          className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
          onClick={() => setOpen((open) => !open)}
          aria-label="Abrir menú"
        >
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </button>
      </div>
      {/* Dropdown Menu */}
      {open && (
        <div className="bg-white shadow-md absolute top-16 left-0 w-full z-50">
          <nav className="flex flex-col items-center space-y-4 p-4 text-gray-700">
            <NavItem href="/" label="Inicio" />
            <NavItem href="/search" label="Explorar" />
            {user && <NavItem href="/dashboard" label="Mi lista" />}
            {/* <NavItem href="/dashboard" label="Dashboard" />
            <NavItem href="/search" label="Buscar" /> */}
            <div className="flex flex-col space-y-2 w-full">
              <div className="flex items-center justify-center space-x-4 p-4">
                {user ? (
                  <UserDropdown
                    user={user}
                    handleLogout={handleLogout}
                  ></UserDropdown>
                ) : (
                  <>
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
                  </>
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
