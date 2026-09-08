"use client";

import { FormEvent, useState } from "react";
import type { CSSProperties } from "react";
import { useInView } from "./useInView";

const HEADING = ["Your", "Table", "Awaits"];
const EMBERS = Array.from({ length: 14 }, (_, i) => i);

/**
 * Contact — the site's closing showpiece.
 *
 * A moody, full-bleed finale: blurred dining-room ambience under a dark
 * wash, slow-rising gold embers, a heading whose words rise one-by-one
 * while a thin gold rule draws itself beneath each word, a pulsing
 * location pin, and a minimal glowing-focus form. Signs off on a quiet
 * note so the page ends deliberately.
 */
export default function Contact() {
  const { ref, inView } = useInView<HTMLElement>(0.25);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      className={`section contact ${inView ? "inview" : ""}`}
      id="contact"
      ref={ref}
    >
      <div className="contact-bg" aria-hidden="true" />
      <div className="contact-ambience" aria-hidden="true">
        {EMBERS.map((i) => (
          <span
            key={i}
            className="ember"
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </div>

      <div className="contact-inner">
        <div className="contact-head">
          <p className="eyebrow">No reservations too small</p>
          <h2 className="contact-title" aria-label="Your table awaits">
            {HEADING.map((word, i) => (
              <span
                key={word}
                className="ct-word"
                style={{ "--i": i } as CSSProperties}
              >
                {word}
              </span>
            ))}
          </h2>
          <p className="contact-lede">
            Speak with us directly — a table, a celebration, or an evening
            planned entirely around the fire.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-details">
            <div className="contact-detail contact-detail--pin">
              <span className="contact-pin" aria-hidden="true" />
              <div className="contact-detail-body">
                <small>Address</small>
                <span>142 Firewood Lane, Fitzrovia, W1T 3JN</span>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-body">
                <small>Phone</small>
                <span>+44 (0)20 7946 0123</span>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-body">
                <small>Hours</small>
                <span>Tuesday – Sunday, 18:00 – 23:00</span>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="contact-success">
              <p className="eyebrow" style={{ marginBottom: "0.8rem" }}>
                Thank you
              </p>
              <p className="serif" style={{ fontSize: "1.6rem" }}>
                We&apos;ll be in touch shortly.
              </p>
              <p
                style={{
                  color: "var(--muted)",
                  marginTop: "0.6rem",
                  fontWeight: 300,
                }}
              >
                Watch your inbox — the fire is already stoked.
              </p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="ct-name">Full Name</label>
                <input
                  id="ct-name"
                  type="text"
                  placeholder="James Carter"
                  required
                />
              </div>
              <div>
                <label htmlFor="ct-email">Email</label>
                <input
                  id="ct-email"
                  type="email"
                  placeholder="james@example.com"
                  required
                />
              </div>
              <div className="field-wide">
                <label htmlFor="ct-msg">Your message</label>
                <textarea
                  id="ct-msg"
                  rows={4}
                  placeholder="Tell us about the occasion…"
                />
              </div>
              <button
                type="submit"
                className="btn btn-gold shine contact-submit"
              >
                Send the Invitation
              </button>
            </form>
          )}
        </div>

        <div className="contact-signoff">
          <span className="contact-signoff-line" aria-hidden="true" />
          <p className="contact-signoff-name">Anwal</p>
          <p className="contact-signoff-tag">Fire, smoke &amp; patience</p>
        </div>
      </div>
    </section>
  );
}