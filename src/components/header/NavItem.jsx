function NavItem({ href, label }) {
  return (
    <a href={href} className="hover:text-blue-500 font-medium">
      {label}
    </a>
  );
}

export default NavItem;
