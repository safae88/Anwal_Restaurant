"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Gallery" },
  { id: "reserve", label: "Reserve" },
];

/**
 * SectionNav — a slim right-edge indicator of where you are in the
 * page. Gold dots follow the IntersectionObserver band; the active dot
 * blooms with a soft gold glow. Clicks are plain anchors, so the site's
 * global SmoothScroll glide handles the travel.
 */
export default function SectionNav() {
  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestId = entry.target.id;
          }
        }
        if (bestId) setActiveId(bestId);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="section-nav" aria-label="Section navigation">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`section-nav-dot ${activeId === s.id ? "active" : ""}`}
          title={s.label}
          aria-label={`Go to ${s.label}`}
          aria-current={activeId === s.id ? "true" : undefined}
        />
      ))}
    </nav>
  );
}