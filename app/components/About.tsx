"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { useReveal } from "./useReveal";
import GoldDivider from "./GoldDivider";
import Stats from "./Stats";

const SWAP_MS = 480;

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
  const [front, setFront] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const busy = useRef(false);
  const ref = useReveal<HTMLDivElement>();

  const advance = () => {
    if (busy.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      setFront((front + 1) % dishes.length);
      return;
    }
    busy.current = true;
    setPrev(front);
    setFront((front + 1) % dishes.length);
    window.setTimeout(() => {
      setPrev(null);
      busy.current = false;
    }, SWAP_MS);
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
          <div className="stack-deck" aria-hidden="true">
            {Array.from({ length: DECK_SIZE - 1 }, (_, i) => {
              const dish = dishes[(front + 1 + i) % dishes.length];
              return (
                <div
                  key={i}
                  className="stack-card"
                  style={{ "--i": i + 1 } as CSSProperties}
                >
                  <Image
                    src={dish.src}
                    fill
                    sizes="(min-width: 900px) 470px, 100vw"
                    alt=""
                    className="stack-card-img"
                  />
                </div>
              );
            })}
          </div>
          <div className="stack-card stack-front">
            <Image
              key={front}
              src={dishes[front].src}
              fill
              sizes="(min-width: 900px) 470px, 100vw"
              alt={dishes[front].name}
              className="stack-card-img"
            />
            <div className="stack-tile">
              <h3>{dishes[front].name}</h3>
              <p>{dishes[front].note}</p>
            </div>
          </div>
          {prev !== null && (
            <div className="stack-card stack-leave" key={prev} aria-hidden="true">
              <Image
                src={dishes[prev].src}
                fill
                sizes="(min-width: 900px) 470px, 100vw"
                alt=""
                className="stack-card-img"
              />
            </div>
          )}
        </div>
      </div>
      <Stats />
    </section>
  );
}
