import { useState, useEffect } from "react";

export default function LoadingSpinner({ delay = 1500 }) {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true); // Solo se muestra si pasa el tiempo de delay
    }, delay);

    return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
  }, [delay]);

  if (!showSpinner) return null; // No renderiza nada si no ha pasado el delay

  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-blue-500 border-t-2 border-b-2 border-secondary"></div>
    </div>
  );
}
