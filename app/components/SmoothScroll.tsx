"use client";

import { useEffect } from "react";
import { easeInOutCubic } from "@/lib/ease";

/**
 * Smooth in-page navigation.
 *
 * Intercepts clicks on `a[href^="#"]` and glides to the target with an
 * eased curve, offsetting for the fixed navbar so section headings are
 * never hidden behind it. Falls back to an immediate jump when
 * prefers-reduced-motion is set. Native CSS `scroll-behavior: smooth`
 * remains as the no-JS fallback.
 */

export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    let raf = 0;

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const navbarOffset = () => {
      const nav = document.querySelector(".navbar");
      if (!nav) return 0;
      return nav.getBoundingClientRect().height + 10;
    };

    const drive = (startY: number, destY: number) => {
      const dist = destY - startY;
      if (Math.abs(dist) < 2) return;

      const duration = Math.min(1400, Math.max(500, Math.abs(dist) * 1.1));
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      const t0 = performance.now();

      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / duration);
        window.scrollTo(0, startY + dist * easeInOutCubic(p));
        if (p < 1) {
          raf = requestAnimationFrame(step);
        } else {
          html.style.scrollBehavior = prevBehavior;
          raf = 0;
        }
      };

      raf = requestAnimationFrame(step);
    };

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.button !== 0
      ) {
        return;
      }
      const target = e.target as Element | null;
      const anchor = target?.closest?.('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const id = href.slice(1);
      if (id === "top") {
        e.preventDefault();
        stop();
        if (reduced) {
          window.scrollTo(0, 0);
        } else {
          drive(window.scrollY, 0);
        }
        return;
      }

      const section = document.getElementById(id);
      if (!section) return;

      e.preventDefault();
      stop();
      const destY = Math.max(
        0,
        section.getBoundingClientRect().top + window.scrollY - navbarOffset()
      );
      if (reduced) {
        window.scrollTo(0, destY);
      } else {
        drive(window.scrollY, destY);
      }
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      stop();
    };
  }, []);

  return null;
}