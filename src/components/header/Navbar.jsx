import NavItem from "./NavItem";
import Button from "../ui/Button";
import MobileNavbar from "./MobileNavbar";
import { Link } from "react-router-dom";

function Navbar() {
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
        <div className="flex justify-center items-center space-x-4 bg-white">
          <Link to="/login">
            <Button label="Iniciar sesión" />
          </Link>
          <Link to="/register">
            <Button label="Registro" />
          </Link>
        </div>
      </header>
      <header className="flex md:hidden">
        <MobileNavbar />
      </header>
    </>
  );
}

export default Navbar;
