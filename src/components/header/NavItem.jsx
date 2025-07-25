import { Link } from "react-router-dom";

function NavItem({ href, label, setOpen, children, className }) {
  return (
    <Link
      onClick={() => {
        setOpen(false);
      }}
      to={href}
      className={`hover:text-blue-500 font-medium ${className}`}
    >
      {label ? label : children}
    </Link>
  );
}

export default NavItem;
