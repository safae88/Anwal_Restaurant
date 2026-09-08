"use client";

import Image from "next/image";
import { useReveal } from "./useReveal";
import GoldDivider from "./GoldDivider";

const shots = [
  { src: "/images/food1.jpg", alt: "Plated main course on dark stoneware" },
  { src: "/images/food2.jpg", alt: "Hand-pulled tagliatelle being plated" },
  { src: "/images/food3.jpg", alt: "Charred octopus with smoked paprika" },
  { src: "/images/food4.jpg", alt: "Forest mushroom tart garnished with thyme" },
  { src: "/images/food5.jpg", alt: "Seared scallops with burnt butter" },
  { src: "/images/food6.jpg", alt: "Molten chocolate dessert with caramel" },
  { src: "/images/food7.jpg", alt: "Interior of the dining room at dusk" },
  { src: "/images/food8.jpg", alt: "Chef finishing a dish at the pass" },
  { src: "/images/food9.jpg", alt: "Cocktail being poured over ice" },
  { src: "/images/food10.jpg", alt: "Table laid for service with candlelight" },
  { src: "/images/food11.jpg", alt: "Amber glow across the bar" },
];

export default function Gallery() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section className="section gallery" id="gallery" ref={ref}>
      <div className="gallery-head reveal">
        <p className="eyebrow">The Ambiance</p>
        <h2>Step inside</h2>
        <div className="gallery-head-divider">
          <GoldDivider width={200} />
        </div>
      </div>
      <div className="gallery-grid">
        {shots.map((shot, i) => (
          <figure className="gallery-item reveal" key={shot.src + i}>
            <Image
              src={shot.src}
              alt={shot.alt}
              width={1680}
              height={944}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
