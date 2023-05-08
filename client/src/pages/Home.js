import React from "react";
import { ScrollButton } from "../components/ScrolButton/ScrolButton";
import { CategorySlider } from "../components/CategorySlider/CategorySlider";
import { TurkeyMapComp } from "../components/TurkeyMap/TurkeyMap";
import { TopSection } from "../components/Section/TopSection";
import { BottomSection } from "../components/Section/BottomSection";
import { Footer } from "../components/Footer/Footer";

export const HomePage = () => {
  return (
    <div>
      <TopSection />
      <CategorySlider />
      {/* <Ilan /> */}
      <ScrollButton />
      <TurkeyMapComp />
      <BottomSection />
      <Footer />
    </div>
  );
};
