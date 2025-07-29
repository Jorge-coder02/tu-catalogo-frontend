export default function LabeledInput({
  id,
  label,
  type = "text",
  placeholder,
  error,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1 mb-2">
      <label htmlFor={id} className="text-[16px] font-semibold tracking-wide">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${
          error
            ? "ring-red-500 focus:ring-red-500"
            : "focus:ring-blue-500 dark:focus:ring-blue-800"
        } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ring-2 ring-gray-300 transition-colors duration-200 dark:bg-gray-800`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
