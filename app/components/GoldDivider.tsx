"use client";

import { useInView } from "./useInView";

interface GoldDividerProps {
  className?: string;
  width?: number;
}

/**
 * Thin gold hairline that draws itself left-to-right on scroll.
 * Self-contained: owns its own IntersectionObserver, no parent wiring needed.
 */
export default function GoldDivider({ className = "", width = 300 }: GoldDividerProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const half = width / 2;
  const gap = 14;

  return (
    <div ref={ref} className={`gold-divider ${inView ? "visible" : ""} ${className}`}>
      <svg width={width} height="24" viewBox={`0 0 ${width} 24`} fill="none" aria-hidden="true">
        {/* left whisker */}
        <path
          className="gd-line"
          d={`M8 12 L${half - gap} 12`}
          style={{ "--gd-len": half - gap - 8 } as React.CSSProperties}
        />
        {/* center diamond */}
        <path
          className="gd-dot"
          d={`M${half} 7 L${half + 5} 12 L${half} 17 L${half - 5} 12 Z`}
        />
        {/* right whisker */}
        <path
          className="gd-line"
          d={`M${half + gap} 12 L${width - 8} 12`}
          style={{ "--gd-len": width - 8 - half - gap } as React.CSSProperties}
        />
      </svg>
    </div>
  );
}
