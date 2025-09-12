import HeroSection from "../components/HeroSection";
import MovieGrid from "../components/MovieGrid";
import { endpoints } from "../api";

const Upcoming = () => (
  <>
    <HeroSection fetchUrl={endpoints.upcoming} />
    <MovieGrid fetchUrl={endpoints.upcoming} />
  </>
);

export default Upcoming;
