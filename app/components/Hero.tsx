"use client";

import { useEffect, useRef } from "react";

const POSTER = "/images/food1.jpg";
const WORDMARK = ["A", "N", "W", "A", "L"];

/**
 * Scroll-linked parallax hook with eased follow-through.
 * A passive scroll listener updates a *target* offset; a rAF loop
 * eases the actual transform toward it, so the motion stays silky
 * (no stepping) and fully GPU-friendly — only when NOT reduced-motion.
 */
function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let current = 0;
    let target = 0;

    const loop = () => {
      raf = 0;
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.01) current = target;
      el.style.transform = `translate3d(0, ${current}px, 0)`;
      if (Math.abs(target - current) > 0.01) {
        raf = requestAnimationFrame(loop);
      }
    };

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      target = (mid - window.innerHeight / 2) * -speed;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return ref;
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const parallaxRef = useParallax<HTMLDivElement>(0.18);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const t = setTimeout(() => video.play().catch(() => {}), 120);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <section className="hero" id="top">
      {/* Background video with parallax */}
      <div className="hero-video-wrap" ref={parallaxRef}>
        <video
          ref={videoRef}
          className="hero-video"
          poster={POSTER}
          muted
          loop
          playsInline
        >
          <source src="/pasta.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hero-overlay" />

      {/* Hero wordmark — the emotional centerpiece */}
      <div className="hero-content">
        <h1 className="hero-wordmark" aria-label="Anwal">
          {WORDMARK.map((letter, i) => (
            <span
            key={i}
            className="w-letter"
            style={{ animationDelay: `${0.45 + i * 0.09}s` }}
            >
              {letter}
            </span>
          ))}
        </h1>
          <p className="eyebrow hero-eyebrow">Restaurant</p>
        <div className="hero-wordmark-underline" aria-hidden="true" />
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll down">
        <span>Scroll</span>
        <div className="line" />
      </a>
    </section>
  );
}