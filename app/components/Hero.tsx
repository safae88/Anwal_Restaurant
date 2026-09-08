"use client";

import { useEffect, useRef } from "react";

const POSTER = "/images/food1.jpg";

/**
 * Minimal scroll-linked parallax hook.
 * Attaches a passive rAF-backed scroll listener that moves the element
 * slightly slower than the viewport — only when NOT reduced-motion.
 */
function useParallax<T extends HTMLElement>(speed: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const tick = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const offset = (mid - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
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

      {/* Hero text */}
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">Anwal · Est. 2018</p>
        <h1 className="hero-tagline serif">
          A different way to <em>experience</em> dining
        </h1>
        <div className="hero-cta">
          <a href="#menu" className="btn btn-gold">
            Explore the Menu
          </a>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll down">
        <span>Scroll</span>
        <div className="line" />
      </a>
    </section>
  );
}
