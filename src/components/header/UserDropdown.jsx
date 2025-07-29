import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDropdown = ({ user, handleLogout, className }) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={`flex items-center text-sm text-gray-800 bg-primary-bg dark:bg-gray-200 hover:bg-gray-200 px-2 py-1 rounded-md ${className}`}
        >
          {user}
          <ChevronDown className="ml-1 w-4 h-4" />
        </button>
      </DropdownMenu.Trigger>

      {/* Desplegable */}
      <DropdownMenu.Content
        className="mt-2 rounded-md bg-white shadow-lg border p-1 w-40 z-50"
        sideOffset={5}
      >
        <DropdownMenu.Item
          className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded"
          onSelect={() => navigate("/perfil")}
        >
          Perfil
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="px-3 py-2 text-sm text-red-600 hover:bg-red-100 cursor-pointer rounded"
          onSelect={handleLogout}
        >
          Cerrar sesión
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default UserDropdown;
