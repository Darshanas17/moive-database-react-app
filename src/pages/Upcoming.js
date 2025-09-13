import HeroSection from "../components/HeroSection";
import MovieGrid from "../components/MovieGrid";
import { endpoints } from "../api";

const Upcoming = () => (
  <>
    <HeroSection fetchUrl={endpoints.upcoming} />
    <h2 className="text-2xl text-white px-6 mt-4">Upcoming</h2>

    <MovieGrid fetchUrl={endpoints.upcoming} />
  </>
);

export default Upcoming;
