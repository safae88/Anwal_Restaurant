"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className={`navbar ${scrolled || open ? "scrolled" : ""}`}>
        <a href="#top" className="navbar-brand" onClick={() => setOpen(false)}>
          Anwal
        </a>
        <div className="nav-links">
          <a href="#menu" className="nav-link">
            Menu
          </a>
          <a href="#gallery" className="nav-link">
            Gallery
          </a>
          <a href="#reserve" className="nav-link">
            Reserve
          </a>
        </div>
        <button
          className={`burger ${open ? "open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <a href="#top" onClick={() => setOpen(false)}>
          Home
        </a>
        <a href="#menu" onClick={() => setOpen(false)}>
          Menu
        </a>
        <a href="#gallery" onClick={() => setOpen(false)}>
          Gallery
        </a>
        <a href="#reserve" onClick={() => setOpen(false)}>
          Reserve
        </a>
      </div>
    </>
  );
}
