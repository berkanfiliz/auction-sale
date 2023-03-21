import React from "react";
import { Ilan } from "../components/Ilan/Ilan";
import { ScrollButton } from "../components/ScrolButton/ScrolButton";
import { CategorySlider } from "../components/CategorySlider/CategorySlider";

export const HomePage = () => {
  return (
    <div>
      <CategorySlider />
      {/* <Ilan /> */}
      <ScrollButton />
    </div>
  );
};
