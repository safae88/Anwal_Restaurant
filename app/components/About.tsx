"use client";

import Image from "next/image";
import { useState } from "react";
import { useReveal } from "./useReveal";
import GoldDivider from "./GoldDivider";

const dishes = [
  {
    src: "/images/food1.jpg",
    name: "Ember-Glazed Short Rib",
    note: "Charred on the coals, lacquered in burnt honey.",
  },
  {
    src: "/images/food2.jpg",
    name: "Hand-Pulled Tagliatelle",
    note: "Slow-cooked ragu, aged parmesan, black pepper.",
  },
  {
    src: "/images/food3.jpg",
    name: "Charred Octopus",
    note: "Smoked paprika, lemon confit, olive oil.",
  },
  {
    src: "/images/food4.jpg",
    name: "Forest Mushroom Tart",
    note: "Wild mushrooms, thyme, a whisper of truffle.",
  },
  {
    src: "/images/food5.jpg",
    name: "Burnt Butter Scallops",
    note: "Seared over open flame, brown butter, sea salt.",
  },
  {
    src: "/images/food6.jpg",
    name: "Molten Chocolate",
    note: "Dark chocolate, salted caramel, vanilla bean.",
  },
];

const DECK_SIZE = 5;

export default function About() {
  const [top, setTop] = useState(0);
  const ref = useReveal<HTMLDivElement>();

  const advance = () => {
    setTop((t) => (t + 1) % dishes.length);
  };

  return (
    <section className="section" id="about">
      <div className="about-grid" ref={ref}>
        <div className="about-text reveal">
          <p className="eyebrow">Our Story</p>
          <h2>
            More than a meal — <span className="accent">a quiet ritual</span>
          </h2>
          <p>
            At Anwal we slow everything down. Fire, smoke, and patience shape
            every dish that leaves the pass. There are no shortcuts here — only
            ingredients treated with care and a room designed to let you
            breathe.
          </p>
          <p style={{ marginTop: "1rem", fontSize: "0.88rem", color: "rgba(201,162,75,0.85)" }}>
            Tap the stack to meet the signatures.
          </p>
          <GoldDivider width={260} className="about-divider" />
        </div>

        <div className="stack reveal" onClick={advance}>
          {Array.from({ length: DECK_SIZE }, (_, i) => {
            const dish = dishes[(top + i) % dishes.length];
            return (
              <div
                key={i}
                className="stack-card"
                style={
                  {
                    zIndex: DECK_SIZE - i,
                    "--i": i,
                  } as React.CSSProperties
                }
                aria-hidden={i !== 0}
              >
                <Image
                  src={dish.src}
                  fill
                  sizes="(min-width: 900px) 470px, 100vw"
                  alt={i === 0 ? dish.name : ""}
                  className="stack-card-img"
                />
                {i === 0 && (
                  <div className="stack-tile">
                    <h3>{dish.name}</h3>
                    <p>{dish.note}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
