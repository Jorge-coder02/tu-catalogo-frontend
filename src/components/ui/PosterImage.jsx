import { useState } from "react";

// PosterImage.jsx
export default function PosterImage({ src, alt, onClick, className = "" }) {
  const fallback = "/img/imgnotfound.jpg";
  const [imgSrc, setImgSrc] = useState(src !== "N/A" ? src : fallback);

  return (
    <img
      onClick={onClick}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      className={`object-cover rounded w-full h-full ${className} dark:hover:opacity-60 hover:opacity-80`}
    />
  );
}
