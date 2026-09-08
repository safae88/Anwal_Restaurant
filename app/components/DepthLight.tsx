"use client";

import { useEffect, useRef } from "react";

/**
 * DepthLight — a global, lerped "light source" that drives layered
 * depth shadows behind key images (stack cards, gallery, hero), and a
 * soft cursor-following ambient glow that washes over the dark
 * sections (menu, reserve).
 *
 * On every pointer move and scroll it nudges two CSS custom properties
 * (--depth-x / --depth-y) by a few pixels, and tracks the pointer as
 * percentages in (--glow-x / --glow-y). CSS composes those into
 * box-shadows, vignettes and radial light, so everything appears to
 * shift and breathe with the user — a quiet sense of physical
 * dimension.
 *
 * Only custom-property writes happen in the rAF loop (no layout, no
 * transform paint work), values are written only when they change, and
 * the loop idles when the values settle. Reduced-motion pins the
 * depth at 0; the ambient glow simply stays at its centered fallback.
 */
export default function DepthLight() {
  const pointerX = useRef(0); // -1..1
  const pointerY = useRef(0);

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    // Cursor-driven depth is pointless (and battery-draining) on touch —
    // leave a subtle scroll-only drift or pin to a static shadow instead.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduced || !finePointer) {
      root.style.setProperty("--depth-x", "0");
      root.style.setProperty("--depth-y", "0");
      return;
    }

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let lastX = "";
    let lastY = "";
    let lastGX = "";
    let lastGY = "";

    const computeTargets = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollable <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / scrollable));
      // Gentle sinusoidal drift as the page travels, plus the cursor.
      const drift = Math.sin(progress * Math.PI * 2) * 0.16;
      tx = Math.max(-1, Math.min(1, pointerX.current * 0.85));
      ty = Math.max(-1, Math.min(1, pointerY.current * 0.85 + drift));
    };

    const paint = () => {
      raf = 0;
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      const px = (cx * 16).toFixed(2);
      const py = (cy * 10).toFixed(2);
      if (px !== lastX) {
        root.style.setProperty("--depth-x", px);
        lastX = px;
      }
      if (py !== lastY) {
        root.style.setProperty("--depth-y", py);
        lastY = py;
      }
      const gx = ((cx * 50) + 50).toFixed(2);
      const gy = ((cy * 50) + 50).toFixed(2);
      if (gx !== lastGX) {
        root.style.setProperty("--glow-x", `${gx}%`);
        lastGX = gx;
      }
      if (gy !== lastGY) {
        root.style.setProperty("--glow-y", `${gy}%`);
        lastGY = gy;
      }
      if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) {
        raf = requestAnimationFrame(paint);
      }
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerX.current = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY.current = (e.clientY / window.innerHeight) * 2 - 1;
      computeTargets();
      kick();
    };

    const onScroll = () => {
      computeTargets();
      kick();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    computeTargets();
    kick();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}