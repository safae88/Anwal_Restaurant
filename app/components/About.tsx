import Gallery from "./Gallery";

export default function About() {
  return (
    <section className="about">
      <div className="about-text">
        <h2>About Anwal</h2>
        <p>
          A different way to experience dining. Tap the stack to discover each
          dish.
        </p>
      </div>
      <Gallery />
    </section>
  );
}