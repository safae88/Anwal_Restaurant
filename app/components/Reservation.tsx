"use client";

import { FormEvent, useState } from "react";
import { useReveal } from "./useReveal";
import GoldDivider from "./GoldDivider";

export default function Reservation() {
  const ref = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section reserve" id="reserve">
      <div ref={ref} className="reserve-grid reveal">
        <div className="reserve-info">
          <p className="eyebrow">Reserve</p>
          <h2 className="serif">
            Your evening <span className="accent">awaits</span>
          </h2>
          <p>
            No rush. No noise. Just fire, smoke, and a table waiting for you.
            Book in advance or walk in on a quiet night — either way, we&apos;ll
            find you a seat.
          </p>

          <GoldDivider width={240} className="reserve-divider" />

          <div className="reserve-details">
            <div className="reserve-detail">
              <small>Address</small>
              <span>142 Firewood Lane, Fitzrovia, W1T 3JN</span>
            </div>
            <div className="reserve-detail">
              <small>Hours</small>
              <span>Tuesday – Sunday, 18:00 – 23:00</span>
            </div>
            <div className="reserve-detail">
              <small>Phone</small>
              <span>+44 (0)20 7946 0123</span>
            </div>
            <div className="reserve-detail">
              <small>Email</small>
              <span>hello@anwal.co.uk</span>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="reserve-success">
            <p className="eyebrow" style={{ marginBottom: "0.8rem" }}>
              Thank you
            </p>
            <p className="serif" style={{ fontSize: "1.6rem" }}>
              We&apos;ll be in touch shortly.
            </p>
            <p style={{ color: "var(--muted)", marginTop: "0.6rem", fontWeight: 300 }}>
              Check your inbox for a confirmation email.
            </p>
          </div>
        ) : (
          <form className="reserve-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="res-name">Full Name</label>
              <input
                id="res-name"
                type="text"
                placeholder="James Carter"
                required
              />
            </div>
            <div>
              <label htmlFor="res-email">Email</label>
              <input
                id="res-email"
                type="email"
                placeholder="james@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="res-date">Date</label>
              <input id="res-date" type="date" required />
            </div>
            <div>
              <label htmlFor="res-time">Time</label>
              <select id="res-time" required defaultValue="">
                <option value="" disabled>
                  Select a time
                </option>
                <option>18:00</option>
                <option>18:30</option>
                <option>19:00</option>
                <option>19:30</option>
                <option>20:00</option>
                <option>20:30</option>
                <option>21:00</option>
                <option>21:30</option>
              </select>
            </div>
            <div>
              <label htmlFor="res-guests">Guests</label>
              <select id="res-guests" required defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>Private Room</option>
              </select>
            </div>
            <div>
              <label htmlFor="res-occasion">Occasion (optional)</label>
              <input
                id="res-occasion"
                type="text"
                placeholder="Birthday, Anniversary…"
              />
            </div>
            <button type="submit" className="btn btn-gold shine">
              Confirm Reservation
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
