import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";

export const ContentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [endTime, setEndTime] = useState("");
  const [buttonVisibility, setButtonVisibility] = useState(false);
  const [ihale, setIhale] = useState(null);

  useEffect(() => {
    const fetchIhale = async () => {
      try {
        const response = await axios.get(`/api/ihale/${id}`);
        setIhale(response.data.ihale);
        const endTime = response.data.ihale.bitis_tarih;
        console.log(response.data.ihale);
        setEndTime(endTime);
      } catch (error) {
        console.error(error);
      }
    };
    fetchIhale();
    return () => {
      setEndTime("");
    };
  }, [id]);

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const timeDiff = new Date(endTime) - new Date();
      if (timeDiff <= 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setButtonVisibility(false);
        console.log("Süre bitti");
      } else {
        setButtonVisibility(true);
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const handleSendData = () => {
    if (user) {
      navigate(`/room/${id}`);
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div className="container">
      <div className="grid grid-cols-2">
        <div className="flex flex-col mt-10 space-y-10">
          {ihale && <div className="text-4xl text-center font-bold font-serif">{ihale.baslik.toUpperCase()}</div>}
          <div>{ihale && <img className="w-full h-auto" src={`http://localhost:4000/${ihale.image_urls[0]}`} alt="" />}</div>
        </div>
        <div className="flex flex-col justify-center items-end space-y-5 mt-10">
          {ihale && ihale.teklifler.length === 0 ? (
            <div className="bg-slate-500 w-[350px] py-20 text-white text-center flex flex-col space-y-5">
              <div className="text-2xl font-bold font-mono">HERHANGİ BİR TEKLİF YOKTUR</div>
              <div>BASLANGİC FİYAT = {ihale.baslangic_fiyat} TL</div>
            </div>
          ) : (
            <div className="bg-slate-500 w-[350px] py-20 text-white text-center flex flex-col space-y-5">{ihale && <div className="text-2xl font-bold font-mono">GUNCEL TEKLİF = {ihale.teklifler[0].teklif} TL</div>}</div>
          )}
          <div className="bg-slate-500 w-[350px] py-20 text-white flex flex-col space-y-8 items-center justify-center">
            <div className="flex justify-center items-center space-x-10">
              <div className="flex flex-col justify-center items-center">
                <div>GÜN</div>
                <div>{countdown.days}</div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div>SAAT</div>
                <div>{countdown.hours}</div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div>DAKİKA</div>
                <div>{countdown.minutes}</div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div>SANİYE</div>
                <div>{countdown.seconds}</div>
              </div>
            </div>

            {buttonVisibility && (
              <button className="bg-red-500 p-3" onClick={handleSendData}>
                TEKLİF ODASİNA GİT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
