import { useState } from "react";

export default function PosterImage({ src, alt }) {
  const fallback = "public/img/imgnotfound.jpg";
  const [imgSrc, setImgSrc] = useState(src !== "N/A" ? src : fallback);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
      className="sm:w-60 sm:h-80 w-40 h-60 object-cover rounded"
    />
  );
}
