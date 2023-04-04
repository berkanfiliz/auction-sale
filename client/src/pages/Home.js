import React from "react";
import { Ilan } from "../components/Ilan/Ilan";
import { ScrollButton } from "../components/ScrolButton/ScrolButton";
import { CategorySlider } from "../components/CategorySlider/CategorySlider";
import { TurkeyMapComp } from "../components/TurkeyMap/TurkeyMap";
import { TopSection } from "../components/Section/TopSection";

export const HomePage = () => {
  return (
    <div>
      <TopSection />
      <CategorySlider />
      {/* <Ilan /> */}
      <ScrollButton />
      <TurkeyMapComp />
    </div>
  );
};
