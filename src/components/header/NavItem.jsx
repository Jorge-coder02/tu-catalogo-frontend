import { Link } from "react-router-dom";

function NavItem({ href, label }) {
  return (
    <Link to={href} className="hover:text-blue-500 font-medium">
      {label}
    </Link>
  );
}

export default NavItem;
