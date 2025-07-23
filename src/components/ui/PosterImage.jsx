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
      className={`sm:w-60 sm:h-80 w-40 h-60 object-cover rounded ${className}`}
    />
  );
}
