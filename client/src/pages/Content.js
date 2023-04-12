import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { ScrollButton } from "../components/ScrolButton/ScrolButton";

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
      <div className="grid md:grid-cols-2 grid-col-1">
        <div className="flex flex-col mt-10 space-y-10 mr-4">
          {ihale && <div className="text-4xl text-center font-bold font-serif">{ihale.baslik.toUpperCase()}</div>}
          <div className="h-[415px]">{ihale && <img className="w-full h-full" src={`http://localhost:4000/${ihale.image_urls[0]}`} alt="" />}</div>
          {ihale && (
            <div className="bg-white rounded-lg border-2 border-gray-300 shadow-lg p-4">
              <h2 className="text-black font-semibold text-2xl text-center mb-4">AÇIKLAMA</h2>
              <p className="text-gray-700 font-serif">{ihale.aciklama}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end space-y-5 mt-10">
          {ihale && ihale.teklifler.length === 0 ? (
            <div className="bg-gray-300 w-full lg:w-2/3 py-20 text-center flex flex-col space-y-5 text-black">
              <div className="text-2xl font-bold font-mono">HERHANGİ BİR TEKLİF YOKTUR</div>
              <div>BASLANGİC FİYAT = {ihale.baslangic_fiyat} TL</div>
            </div>
          ) : (
            <div className="bg-gray-300 w-full lg:w-2/3  py-20 text-white text-center flex flex-col space-y-5">
              {ihale && (
                <div className="text-2xl font-bold font-mono text-black px-8">
                  GUNCEL TEKLİF <br /> {ihale.teklifler[0].teklif} TL
                </div>
              )}
            </div>
          )}
          <div className="bg-gray-300 w-full lg:w-2/3 py-20 text-white flex flex-col space-y-8 items-center justify-center font-bold">
            <div className="flex justify-center items-center space-x-10 text-black">
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
              <button className="bg-red-600 hover:bg-red-700 p-3" onClick={handleSendData}>
                TEKLİF ODASINA GİT
              </button>
            )}
          </div>
          <div class="mt-10 w-full lg:w-2/3">
            <h2 class="text-xl font-semibold mb-4 mt-10">Yorumlar</h2>
            <div class="bg-gray-100 rounded-lg p-4 mb-4">
              <div class="flex items-center space-x-4 mb-4">
                <div class="h-10 w-10 rounded-full overflow-hidden">Resim</div>
                <div>
                  <div class="font-semibold">Kullanıcı Adı</div>
                  <div class="text-gray-500 text-sm">01.01.2022</div>
                </div>
              </div>
              <div class="text-gray-700">Yorum metni burada olacak</div>
            </div>
            <form class="bg-gray-100 rounded-lg p-4 mb-4">
              <h3 class="text-lg font-semibold mb-4">Yorum Yaz</h3>
              <div class="mb-4">
                <textarea class="block w-full border-gray-300 rounded-md shadow-sm p-2" rows="4" placeholder="Yorumunuzu buraya yazın"></textarea>
              </div>
              <div class="text-right">
                <button type="submit" class="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:bg-red-800 focus:outline-none">
                  Gönder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ScrollButton />
    </div>
  );
};
