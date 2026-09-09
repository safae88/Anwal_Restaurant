import CinematicIntro from "./components/CinematicIntro";
import ScrollThread from "./components/ScrollThread";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Quote from "./components/Quote";
import Gallery from "./components/Gallery";
import Reservation from "./components/Reservation";
import FoodArt from "./components/FoodArt";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <CinematicIntro />
      <ScrollThread />
      <div className="film-grain" aria-hidden="true" />
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Quote />
      <Gallery />
      <Reservation />
      <FoodArt />
      <Contact />
      <Footer />
    </main>
  );
}
