import MovieGrid from "../components/MovieGrid";
import HeroSection from "../components/HeroSection";
import { endpoints } from "../api";

const Popular = () => (
  <>
    <HeroSection fetchUrl={endpoints.popular} />
    <MovieGrid fetchUrl={endpoints.popular} />
  </>
);

export default Popular;
