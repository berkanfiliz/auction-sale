import trMap from "../../assets/tr.svg";
import "./TurkeyMap.css"; // CSS dosyasını ekleyin
import { useEffect, useState } from "react";

export const TurkeyMapComp = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(true);
  }, []);

  return (
    <div className="relative container">
      <img className="w-full" src={trMap} alt="Turkey Map" />
      <p className="absolute text-center inset-0 flex items-center justify-center md:text-xl lg:text-3xl text-green-600 font-bold font-serif">TÜRKİYE'NİN DÖRT BİR YANINDAN İHALELER</p>
    </div>
  );
};
