function Button({ label }) {
  return (
    <input
      type="button"
      value={label}
      className="border-2 border-gray-300 p-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-200"
    />
  );
}

export default Button;
