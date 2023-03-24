import { useEffect, useState } from "react";
import axios from "axios";

export const IhaleContent = () => {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 5 });

  useEffect(() => {
    const bilgileriCek = async () => {
      const teklifVeren = await axios.get(`/api/ihale`);
    };
    bilgileriCek();
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown.seconds === 0) {
          if (prevCountdown.minutes === 0) {
            if (prevCountdown.hours === 0) {
              if (prevCountdown.days === 0) {
                console.log("Süre bitti");
                clearInterval(interval);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
              } else {
                return { ...prevCountdown, days: prevCountdown.days - 1, hours: 23, minutes: 59, seconds: 59 };
              }
            } else {
              return { ...prevCountdown, hours: prevCountdown.hours - 1, minutes: 59, seconds: 59 };
            }
          } else {
            return { ...prevCountdown, minutes: prevCountdown.minutes - 1, seconds: 59 };
          }
        } else {
          return { ...prevCountdown, seconds: prevCountdown.seconds - 1 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="container">
      <div className="grid grid-cols-2">
        <div>Burasi Aciklama</div>
        <div className="flex flex-col justify-center items-end space-y-5 mt-10">
          <div className="bg-slate-500 px-20 py-20 text-white">BURASI BİLGİLER BÖLÜMÜ</div>
          <div className="bg-slate-500 px-12 py-20 text-white">
            {countdown.days} GÜN {countdown.hours} SAAT {countdown.minutes} DAKİKA {countdown.seconds} SANİYE
          </div>
        </div>
      </div>
    </div>
  );
};
