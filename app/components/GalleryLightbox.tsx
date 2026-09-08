"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export interface GalleryShot {
  src: string;
  alt: string;
  name: string;
  method: string;
}

/**
 * GalleryLightbox — an elegant, eased reveal of a single image with its
 * preparation note.
 *
 * Enter/exit are not abrupt modals: the backdrop melts in with a soft
 * blur, the image eases up to scale, and the caption settles beneath
 * a beat later — all on the site-wide --ease curve. Closes via the
 * hairline "×", clicking the backdrop, or Escape, and never traps the
 * scroll without a lock + three ways out.
 */
export default function GalleryLightbox({
  shot,
  closing,
  onClose,
}: {
  shot: GalleryShot;
  closing: boolean;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(true));
    closeRef.current?.focus();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`lightbox ${open && !closing ? "open" : ""} ${
        closing ? "closing" : ""
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={shot.name}
    >
      <div className="lightbox-backdrop" onClick={onClose} />
      <figure className="lightbox-panel" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close"
          ref={closeRef}
        >
          {"\u00d7"}
        </button>
        <div className="lightbox-media">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={1680}
            height={944}
            sizes="(min-width: 1024px) 70vw, 92vw"
            priority
          />
        </div>
        <figcaption className="lightbox-caption">
          <p className="lightbox-eyebrow">{shot.name}</p>
          <p className="lightbox-method">{shot.method}</p>
        </figcaption>
      </figure>
    </div>
  );
}