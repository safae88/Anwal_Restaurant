"use client";

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

export default function Gallery() {
  const [top, setTop] = useState(0);
  const [ratio, setRatio] = useState(4 / 3);

  function popCard() {
    setTop((t) => (t + 1) % images.length);
  }

  const deckSize = 6;

  return (
    <div className="stack" style={{ aspectRatio: ratio }}>
      {Array.from({ length: deckSize }, (_, i) => {
        const src = images[(top + i) % images.length];
        return (
          <div
            key={i}
            className={`stack-card ${i === 0 ? "top-card" : ""}`}
            style={{ zIndex: deckSize - i, "--i": i } as React.CSSProperties}
            onClick={i === 0 ? popCard : undefined}
          >
            <img
              src={src}
              alt={`Dish ${top + i + 1}`}
              onLoad={
                i === 0
                  ? (e) => {
                      const el = e.currentTarget;
                      const r = el.naturalWidth / el.naturalHeight;
                      if (r > 0 && Math.abs(r - ratio) > 0.01) setRatio(r);
                    }
                  : undefined
              }
            />
          </div>
        );
      })}
    </div>
  );
}