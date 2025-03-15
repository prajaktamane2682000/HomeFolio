import Hero from "@/components/Hero";

import Infobox from "@/components/Infoboxes";
import HomeProperties from "@/components/HomeProperties";
import { FeaturedProperties } from "@/components/FeaturedProperties";

const HomePage = () => {
  return (
    <div className="text-2xl">
      <Hero />
      <Infobox />
      <FeaturedProperties />
      <HomeProperties />
    </div>
  );
};

export default HomePage;
