"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useReveal } from "./useReveal";
import GoldDivider from "./GoldDivider";
import GalleryLightbox, { type GalleryShot } from "./GalleryLightbox";

const shots: GalleryShot[] = [
  {
    src: "/images/food1.jpg",
    alt: "Plated main course on dark stoneware",
    name: "Ember-Glazed Short Rib",
    method:
      "Forty-eight hours over the coals, lacquered in burnt honey until the edges turn to glass.",
  },
  {
    src: "/images/food2.jpg",
    alt: "Hand-pulled tagliatelle being plated",
    name: "Hand-Pulled Tagliatelle",
    method:
      "Rolled by hand each morning, tossed through a ragu that has quietly simmered since the evening before.",
  },
  {
    src: "/images/food3.jpg",
    alt: "Charred octopus with smoked paprika",
    name: "Charred Octopus",
    method:
      "Seared hard against the open flame until the edges crisp, finished with smoked paprika and lemon confit.",
  },
  {
    src: "/images/food4.jpg",
    alt: "Forest mushroom tart garnished with thyme",
    name: "Forest Mushroom Tart",
    method:
      "Wild mushrooms sweated low and slow in thyme butter, blind-baked with a whisper of truffle.",
  },
  {
    src: "/images/food5.jpg",
    alt: "Seared scallops with burnt butter",
    name: "Burnt Butter Scallops",
    method:
      "Dropped into foaming brown butter at the hottest point of the fire, finished with flakes of sea salt.",
  },
  {
    src: "/images/food6.jpg",
    alt: "Molten chocolate dessert with caramel",
    name: "Molten Chocolate",
    method:
      "Baked only until its centre begins to give, served still trembling with salted caramel beneath.",
  },
  {
    src: "/images/food7.jpg",
    alt: "Interior of the dining room at dusk",
    name: "The Dining Room at Dusk",
    method:
      "Candles lit by hand, the fire banked low, tables laid while the room settles into its evening hum.",
  },
  {
    src: "/images/food8.jpg",
    alt: "Chef finishing a dish at the pass",
    name: "At the Pass",
    method:
      "Every plate leaves in silence — a final dust of salt, a last scrape of jus, and straight to the table.",
  },
  {
    src: "/images/food9.jpg",
    alt: "Cocktail being poured over ice",
    name: "The Bar",
    method:
      "Stirred slowly over a single large cube, smoked with orange peel, served without a single flourish.",
  },
  {
    src: "/images/food10.jpg",
    alt: "Table laid for service with candlelight",
    name: "Laid for Service",
    method:
      "Cutlery squared to the millimetre, linens pressed, one candle per cover — the room quietly waiting.",
  },
  {
    src: "/images/food11.jpg",
    alt: "Amber glow across the bar",
    name: "The Amber Hour",
    method:
      "Low amber light, dark wood, and the unhurried rhythm of glasses being set down.",
  },
];

export default function Gallery() {
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState<number | null>(null);
  const [closing, setClosing] = useState(false);

  const openLightbox = useCallback((i: number) => {
    setActive(i);
    setClosing(false);
  }, []);

  const closeLightbox = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setActive(null);
      setClosing(false);
    }, 500);
  }, []);

  useEffect(() => {
    const wasLocked = document.body.style.overflow === "hidden";
    if (active !== null) document.body.style.overflow = "hidden";
    return () => {
      if (!wasLocked) document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, closeLightbox]);

  return (
    <>
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
            <figure
              className="gallery-item reveal"
              key={shot.src + i}
              style={{ transitionDelay: `${(i % 3) * 90}ms` }}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`View preparation for ${shot.name}`}
              onClick={() => openLightbox(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(i);
                }
              }}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1680}
                height={944}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
              <span className="gallery-hint">View preparation</span>
            </figure>
          ))}
        </div>
      </section>
      {active !== null && (
        <GalleryLightbox
          shot={shots[active]}
          closing={closing}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}