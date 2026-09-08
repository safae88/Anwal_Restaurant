"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";
import { sampleBezier } from "@/lib/ease";

const stats = [
  { value: 8, label: "Years stoking the fire" },
  { value: 28, label: "Dishes on the ever-changing menu" },
  { value: 48, label: "Hours some cuts spend on the coals" },
];

function Count({ value, start }: { value: number; start: boolean }) {
  const [n, setN] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!start || done.current) return;
    done.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const settleRaf = requestAnimationFrame(() => setN(value));
      return () => cancelAnimationFrame(settleRaf);
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1600;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setN(Math.round(value * sampleBezier(p)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, value]);

  return <span className="stat-num">{n}</span>;
}

/**
 * Stats — a quiet band of figures (years, dishes, hours) that count
 * up on the same eased curve as every other transition, in the serif
 * gold treatment, once scrolled into view. Reduced-motion jumps
 * straight to the final value.
 */
export default function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);

  return (
    <div ref={ref} className={`stats reveal ${inView ? "visible" : ""}`}>
      {stats.map((s) => (
        <div className="stat" key={s.label}>
          <Count value={s.value} start={inView} />
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}