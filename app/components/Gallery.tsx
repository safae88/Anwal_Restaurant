"use client";

import Image from "next/image";
import { useState } from "react";

const images = [
  "/images/food1.jpg",
  "/images/food2.jpg",
  "/images/food3.jpg",
  "/images/food4.jpg",
  "/images/food5.jpg",
  "/images/food6.jpg",
  "/images/food7.jpg",
  "/images/food8.jpg",
  "/images/food9.jpg",
  "/images/food10.jpg",
  "/images/food11.jpg",
];

const DECK_SIZE = 6;

export default function Gallery() {
  const [top, setTop] = useState(0);
  const [ratio, setRatio] = useState(4 / 3);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    const nextRatio = el.naturalWidth / el.naturalHeight;

    if (nextRatio > 0 && Math.abs(nextRatio - ratio) > 0.01) {
      setRatio(nextRatio);
    }
  };

  const advance = () => {
    setTop((t) => (t + 1) % images.length);
  };

  return (
    <div className="stack" style={{ aspectRatio: ratio }}>
      {Array.from({ length: DECK_SIZE }, (_, i) => {
        const src = images[(top + i) % images.length];

        return (
          <div
            key={i}
            className="stack-card"
            style={{ zIndex: DECK_SIZE - i, "--i": i } as React.CSSProperties}
            onClick={i === 0 ? advance : undefined}
          >
            <Image
              src={src}
              fill
              sizes="(min-width: 768px) 420px, 100vw"
              alt={`Dish ${top + i + 1}`}
              className="stack-card-img"
              onLoad={i === 0 ? handleImageLoad : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}