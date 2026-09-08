interface BezierCurve {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** The site-wide luxury easing — must match --ease in globals.css. */
const EASE_CURVE: BezierCurve = {
  x1: 0.16,
  y1: 1,
  x2: 0.3,
  y2: 1,
};

/**
 * Numerically sample a cubic-bezier curve so JS-driven motion (scroll
 * thread, stat count-ups) glides identically to every CSS transition.
 */
export function sampleBezier(
  p: number,
  curve: BezierCurve = EASE_CURVE
): number {
  const { x1, y1, x2, y2 } = curve;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 14; i++) {
    const t = (lo + hi) / 2;
    const mt = 1 - t;
    const x = 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t;
    if (x < p) lo = t;
    else hi = t;
  }
  const t = (lo + hi) / 2;
  const mt = 1 - t;
  return 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t;
}

/** Symmetric ease-in-out for scroll glides. */
export function easeInOutCubic(p: number): number {
  return p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
}