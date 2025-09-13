import MovieGrid from "../components/MovieGrid";
import HeroSection from "../components/HeroSection";
import { endpoints } from "../api";

const Popular = () => (
  <>
    <HeroSection fetchUrl={endpoints.popular} />
    <h2 className="text-2xl text-white px-6 mt-4">Popular</h2>

    <MovieGrid fetchUrl={endpoints.popular} />
  </>
);

export default Popular;
