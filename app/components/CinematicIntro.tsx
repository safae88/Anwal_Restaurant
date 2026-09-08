"use client";

import { useEffect, useState } from "react";

/**
 * Full-screen page-load intro: ANWAL wordmark fades up, a gold rule draws,
 * then the whole overlay lifts away (1.6s). Hero's own CSS animations are
 * timed so the reveal lands just as this clears.
 */
export default function CinematicIntro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setDone(true), reduced ? 0 : 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`intro ${done ? "done" : ""}`} aria-hidden="true">
      <div className="intro-logo">Anwal</div>
      <div className="intro-rule" />
      <div className="intro-tag">Fire &middot; Smoke &middot; Patience</div>
    </div>
  );
}