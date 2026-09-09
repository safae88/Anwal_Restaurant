"use client";

import { useEffect, useRef } from "react";
import { sampleBezier } from "@/lib/ease";
import { SECTIONS } from "@/lib/sections";

/**
 * ScrollThread — the site's signature scroll interaction.
 *
 * A thin gold thread runs down the left edge of the page and "draws"
 * itself as the user scrolls, like a single continuous brushstroke
 * connecting every section. The leading tip pulses gently as it
 * passes each section — about, menu, gallery, reserve — then settles.
 *
 * GPU-friendly: only `transform` and `opacity` are animated, driven
 * by a passive scroll listener + requestAnimationFrame (60fps).
 * Respects prefers-reduced-motion — the scroll-linking collapses to a
 * simple static, gently-faded thread.
 */
export default function ScrollThread() {
  const fillRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (reduced) return;

    const fill = fillRef.current;
    const head = headRef.current;
    if (!fill || !head) return;

    const nodes = SECTIONS.map((s) =>
      document.getElementById(s.id)
    ).filter((el): el is HTMLElement => el instanceof HTMLElement);

    let raf = 0;
    let progress = 0;
    let travelPx = fill.clientHeight;
    let tipOpacity = 0.9; // settled tip opacity
    let tipScale = 1;
    let lastNodeIdx = -1;

    const measure = () => {
      travelPx = fill.clientHeight;
    };

    const paintFrame = () => {
      raf = 0;
      const eased = sampleBezier(progress);
      const travel = travelPx * eased;
      fill.style.transform = `scaleY(${eased})`;
      head.style.transform = `translate3d(0, ${travel}px, 0) scale(${tipScale})`;
      head.style.opacity = tipOpacity.toFixed(3);
    };

    const settleLoop = () => {
      raf = 0;
      tipScale += (1 - tipScale) * 0.08;
      tipOpacity += (0.92 - tipOpacity) * 0.06;
      paintFrame();
      if (tipScale > 1.02 || tipOpacity > 0.94) {
        raf = requestAnimationFrame(settleLoop);
      }
    };

    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      progress = scrollable <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / scrollable));

      // Pulse the tip as it crosses each section's top edge.
      const probeY = window.scrollY + window.innerHeight * 0.5;
      let current = -1;
      for (let i = 0; i < nodes.length; i++) {
        if (probeY >= nodes[i].getBoundingClientRect().top + window.scrollY) {
          current = i;
        }
      }
      if (current !== lastNodeIdx) {
        lastNodeIdx = current;
        tipScale = 1.85;
        tipOpacity = 1;
        if (!raf) raf = requestAnimationFrame(settleLoop);
      }
      if (!raf) raf = requestAnimationFrame(paintFrame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scroll-thread" aria-hidden="true">
      <div className="scroll-thread__track" />
      <div className="scroll-thread__fill" ref={fillRef} />
      <div className="scroll-thread__head" ref={headRef} />
    </div>
  );
}