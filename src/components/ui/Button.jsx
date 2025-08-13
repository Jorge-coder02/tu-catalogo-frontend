function Button({ label, className, onClick }) {
  return (
    <input
      type="button"
      value={label}
      className={` p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-200 ${className}`}
      onClick={onClick}
    />
  );
}

export default Button;
