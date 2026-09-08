"use client";

import { useEffect, useRef, useState } from "react";

const videos = [
  "/pasta.mp4",
  "/pizza1.mp4",
  "/tacos1.mp4",
  "/burger1.mp4",
  "/pasta2.mp4",
  "/meat.mp4",
  "/pizza2.mp4",
  "/pizza3.mp4",
  "/burger2.mp4",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.play().catch(() => {});
    }
  }, [index]);

  function playNext() {
    setIndex((i) => (i + 1) % videos.length);
  }

  return (
    <section className="hero">
      <video
        key={videos[index]}
        ref={videoRef}
        className="hero-video"
        src={videos[index]}
        autoPlay
        muted
        playsInline
        onEnded={playNext}
      />
      <div className="hero-content">
        <h1>Anwal</h1>
        <p>A different way to experience dining</p>
        <button>Explore Menu</button>
      </div>
    </section>
  );
}