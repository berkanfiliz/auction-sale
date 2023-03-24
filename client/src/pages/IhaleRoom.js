import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const IhaleRoomPage = () => {
  const socket = io.connect("http://localhost:8900"); //4000 e döndür olmazsa
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log("User = " + user._id);

  const [verilenteklif, setVerilenteklif] = useState([{ id: "640dd0b32f20aacb15b36e01", teklif: "100" }]);
  const [teklifler, setTeklifler] = useState([]);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [endTime, setEndTime] = useState("");
  const [buttonVisibility, setButtonVisibility] = useState(false);

  useEffect(() => {
    socket.emit("room", id);

    console.log("Buraya girdi ilk yüklenme");
    const tekliflerDoldur = async () => {
      const ihale = await axios.get(`/api/ihale/${id}`);
      const endTime = ihale.data.ihale.bitis_tarih;
      const teklifdb = ihale.data.ihale.teklifler;
      setTeklifler(teklifdb);
      setEndTime(endTime);
    };

    tekliflerDoldur();
    // return () => {
    //   console.log("Buraya girdi temizleme fonksiyonu");
    //   socket.disconnect(); // Socket bağlantısını kes
    // };
  }, []);

  //socket devreye girdiği zaman
  useEffect(() => {
    //console.log("Socket değişti");
    socket.on("messageReturn", (data) => {
      console.log("Data = ", data);
      const teklif = data.teklifler;
      // const teklifVeren = data.teklifVeren;
      console.log("Teklif = " + teklif);
      setTeklifler([...data.teklifler]);
    });
  }, [socket]);
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

  //teklif ver tuşuna basıldığı zaman
  const teklifVer = async () => {
    try {
      const ihale = await axios.get(`/api/ihale/${id}`);
      console.log("İhalemmmm", ihale);
      const tekliflerdb = ihale.data.ihale.teklifler;
      if (ihale.data.ihale.baslangic_fiyat > verilenteklif) {
        toast.error("Minimum tutari geçmelisiniz", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        console.log("Minimum tutari geçmelisiniz");
        return;
      }
      if (tekliflerdb.length !== 0) {
        if (tekliflerdb[0].teklif >= verilenteklif) {
          toast.error(`Verilen maksimum teklifi geçmelisiniz, Maksimum teklif    ${ihale.data.ihale.teklifler[0].teklif} TL`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          console.log("Verilen maksimum teklifi geçmelisiniz, Maksimum teklif    ", ihale.data.ihale.teklifler[0].teklif);
          return;
        }
      }
      const yeniTeklifler = [{ id: user._id, teklif: verilenteklif }, ...teklifler];
      console.log("Tekliflerim = " + teklifler);
      await socket.emit("teklif", {
        teklifler: yeniTeklifler,
        id,
      });
      const verilenteklifdb = await axios.patch(`/api/ihale/${id}`, { teklifler: yeniTeklifler });
      setTeklifler(yeniTeklifler);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="grid grid-cols-2">
        <div className="space-y-2">
          <ToastContainer />
          {teklifler &&
            teklifler.map((item) => (
              <div className="flex flex-col justify-between items-center border border-black mt-10">
                <div>Teklif veren = {item.id}</div>
                <div>Teklif = {item.teklif} TL</div>
              </div>
            ))}
        </div>
        <div className="flex flex-col justify-start items-end space-y-5 mt-10">
          <div className="bg-slate-500 w-[350px] py-20 text-white flex space-x-6 items-center justify-center">
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
            {/* {countdown.days} GÜN {countdown.hours} SAAT {countdown.minutes} DAKİKA {countdown.seconds} SANİYE */}
          </div>
          {buttonVisibility && (
            <div className="bg-slate-500 w-[350px] py-20 text-white text-center">
              <div className="flex flex-col justify-center items-center">
                Ihale Room Page
                <input
                  className="text-black"
                  type="number"
                  onChange={(e) => {
                    setVerilenteklif(e.target.value);
                  }}
                />
                <button onClick={teklifVer} className="bg-blue-600 p-3 mt-5">
                  Teklif ver
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
