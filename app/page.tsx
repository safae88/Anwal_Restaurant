import CinematicIntro from "./components/CinematicIntro";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Reservation from "./components/Reservation";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <CinematicIntro />
      <div className="film-grain" aria-hidden="true" />
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reservation />
      <Footer />
    </main>
  );
}
