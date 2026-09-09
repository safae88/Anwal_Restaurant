"use client";

import { useInView } from "./useInView";

const QUOTE =
  "We don't rush the fire, and we never rush a guest. Everything else follows.";
const WORDS = QUOTE.split(" ");

/**
 * Quote — a calm editorial pause in the scroll journey.
 * The words reveal one-by-one as the section enters, beneath an
 * oversized gold hairline quotation mark; the attribution's underline
 * draws itself last. Motion is intentionally minimal — typography and
 * whitespace carry the moment. The backdrop is a looping, silent cooking
 * film rather than a still.
 */
export default function Quote() {
  const { ref, inView } = useInView<HTMLElement>(0.35, "0px 0px -12% 0px");

  return (
    <section ref={ref} className={`quote ${inView ? "inview" : ""}`}>
      <div className="quote-bg">
        <video
          className="quote-bg-img"
          src="/meat.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
      <div className="quote-overlay" aria-hidden="true" />

      <div className="quote-inner">
        <div className="quote-mark" aria-hidden="true">
          &ldquo;
        </div>
        <blockquote className="quote-text">
          {WORDS.map((word, i) => (
            <span
              key={i}
              className="q-word"
              style={{ transitionDelay: `${90 + i * 80}ms` }}
            >
              {word}
              {i < WORDS.length - 1 ? "\u00A0" : ""}
            </span>
          ))}
        </blockquote>
        <cite className="quote-att">Marcus Hale · Executive Chef</cite>
      </div>
    </section>
  );
}