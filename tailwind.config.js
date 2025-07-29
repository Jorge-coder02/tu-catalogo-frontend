/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 🌞 Light
        "primary-bg": "#F9FAFB", // fondo claro
        "primary-text": "#1F2937", // gris oscuro para texto en claro
        // 🌙 Dark
        "primary-dark-bg": "#111827", // fondo primary
        "secondary-dark-bg": "#1E293B", // fondo secondary
        "primary-dark-text": "#D1D5DB", // texto primary
        "secondary-dark-text": "#D2B5DB", // texto secondary
      },
    },
  },
  plugins: [],
};
