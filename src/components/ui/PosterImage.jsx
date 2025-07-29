import { useState } from "react";

export default function PosterImage({ src, alt, onClick, className = "" }) {
  const fallback = "public/img/imgnotfound.jpg";
  const [imgSrc, setImgSrc] = useState(src !== "N/A" ? src : fallback);

  return (
    <img
      onClick={onClick}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)} // Fallback imagen si no se carga
      className={`sm:w-full sm:h-80 mb-4 w-40 h-80 object-cover rounded ${className}`}
    />
  );
}
