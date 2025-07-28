export default function CategoryButton({ value, selectedCategory, onClick }) {
  return (
    <input
      type="button"
      value={value}
      className={`cursor-pointer ${
        selectedCategory === value.toLowerCase() ? "font-bold" : ""
      }`}
      onClick={() => onClick(value.toLowerCase())}
    />
  );
}
