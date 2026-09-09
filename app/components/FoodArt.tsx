"use client";

import Image from "next/image";
import { useInView } from "./useInView";

const STORY = [
  "In 1591 Giuseppe Arcimboldo built a face out of the harvest — Vertumnus, portrait of the Roman god of seasons, whose skin is fruit, whose collar is wheat and barley. An artist once looked at a pear and saw a cheekbone.",
  "Food, it turns out, has always been more than nourishment. It is craft and wit and imagination, arranged with the same care a painter gives a canvas — a quiet reminder that the table can hold a kind of studio.",
  "At Anwal every plate leaves the pass that way: ingredients weighed, balanced, and set down as deliberately as a still life. Here, the kitchen is a studio, and you are our favourite subject.",
];

/**
 * Food as Art — the site's reverent interlude.
 *
 * Full-viewport section with a warm deep-tone background, a film-grain
 * overlay and a breathing golden glow that pulses subliminally behind
 * a large-format Vertumnus dissolving from the dark. The title and
 * story text arrive in sequence; the credit line rises last.
 */
export default function FoodArt() {
  const { ref, inView } = useInView<HTMLElement>(0.3);

  return (
    <section
      className={`section art ${inView ? "inview" : ""}`}
      id="art"
      ref={ref}
    >
      <div className="art-inner">
        <p
          className={`eyebrow art-eyebrow reveal ${inView ? "visible" : ""}`}
          style={{ transitionDelay: "0.15s" }}
        >
          Food as Art
        </p>

        <div className="art-stage">
          <div className="art-bloom" aria-hidden="true" />
          <Image
            className="art-img"
            src="/images/vertumnus.jpg"
            alt="Giuseppe Arcimboldo, Vertumnus (1591) — a Renaissance portrait composed entirely of fruit, vegetables and grain"
            fill
            sizes="(min-width: 1024px) 560px, 76vw"
            priority
          />
        </div>

        <div
          className={`art-story reveal ${inView ? "visible" : ""}`}
          style={{ transitionDelay: "0.4s" }}
        >
          <h2 className="serif">
            When a face is <span className="accent">made of fruit</span>
          </h2>
          {STORY.map((p, i) => (
            <p key={i} className="art-passage">
              {p}
            </p>
          ))}
          <p className="art-credit">
            Giuseppe Arcimboldo, <em>Vertumnus</em>, 1591 — Skoklosters Slott,
            Sweden
          </p>
        </div>
      </div>
    </section>
  );
}
