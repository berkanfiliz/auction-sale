import trMap from "../../assets/tr.svg";
import "./TurkeyMap.css"; // CSS dosyasını ekleyin
import { useEffect, useState } from "react";

export const TurkeyMapComp = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(true);
  }, []);

  return (
    <div className="container relative">
      <p className="text-3xl text-green-600 hover:text-green-700 font-bold font-serif absolute top-60 left-44">TURKİYE'NİN DÖRT BİR YANINDAN İHALELER</p>
      <img className="w-full" src={trMap} alt="Turkey Map" />
    </div>
  );
};
