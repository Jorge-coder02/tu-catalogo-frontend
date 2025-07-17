import NavItem from "./NavItem";
import Button from "../ui/Button";
import { useState } from "react";

function MobileNavbar() {
  const [open, setOpen] = useState(false);

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
            <NavItem href="/login" label="Login" />
            <NavItem href="/dashboard" label="Dashboard" />
            <NavItem href="/search" label="Buscar" />
            <div className="flex flex-col space-y-2 w-full">
              <Button label="Iniciar sesión" />
              <Button label="Registro" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default MobileNavbar;
