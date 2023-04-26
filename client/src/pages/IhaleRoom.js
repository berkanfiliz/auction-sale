import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ClipLoader from "react-spinners/ClipLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const IhaleRoomPage = () => {
  const navigate = useNavigate();

  const socketRef = useRef(null);
  //4000 e döndür olmazsa
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log("User = " + user._id);
  const [ekstraartis, setEkstraartis] = useState(null);
  const [verilenteklif, setVerilenteklif] = useState(null);
  const [teklifler, setTeklifler] = useState([]);
  const [artismiktar, setArtismiktar] = useState(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [endTime, setEndTime] = useState("");
  const [buttonVisibility, setButtonVisibility] = useState(false);
  const [loading, setLoading] = useState(true);

  //Modal için
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8900"); //4000 e döndür olmazsa
    socketRef.current.emit("room", id);

    const tekliflerDoldur = async () => {
      const ihale = await axios.get(`/api/ihale/${id}`);
      setArtismiktar(ihale.data.ihale.artis_miktari);
      const endTime = ihale.data.ihale.bitis_tarih;
      const teklifdb = ihale.data.ihale.teklifler;
      // console.log("Teklifdb = " + teklifdb);
      setTeklifler(teklifdb);
      if (teklifdb.length === 0) {
        console.log("DB bos");
        setVerilenteklif(ihale.data.ihale.baslangic_fiyat);
      } else {
        setVerilenteklif(ihale.data.ihale.teklifler[0].teklif + ihale.data.ihale.artis_miktari);
      }
      setEndTime(endTime);
    };

    tekliflerDoldur();
    return () => {
      socketRef.current.disconnect(); // Socket bağlantısını kes
    };
  }, []);

  //socket devreye girdiği zaman
  useEffect(() => {
    console.log("Socket değişti");
    socketRef.current.on("messageReturn", (data) => {
      console.log("Data = ", data);
      // const teklifVeren = data.teklifVeren;
      setTeklifler([...data.teklifler]);
    });
  }, [socketRef]);
  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const timeDiff = new Date(endTime) - new Date();
      if (timeDiff <= 0) {
        clearInterval(interval);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setButtonVisibility(false);
        console.log("Süre bitti");
        setOpen(false);
      } else {
        setButtonVisibility(true);
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const teklifVer = async () => {
    try {
      const ihale = await axios.get(`/api/ihale/${id}`);

      const tekliflerdb = ihale.data.ihale.teklifler;
      let sonTeklif = 0;
      if (tekliflerdb.length === 0) {
        sonTeklif = verilenteklif;
      }
      if (tekliflerdb.length !== 0) {
        sonTeklif = ihale.data.ihale.teklifler[0].teklif + artismiktar;
      }
      const yeniTeklifler = [{ _id: user._id, teklif: sonTeklif }, ...teklifler];
      await socketRef.current.emit("teklif", {
        teklifler: yeniTeklifler,
        id,
      });
      await axios.patch(`/api/ihale/${id}`, { teklifler: yeniTeklifler });
      setTeklifler(yeniTeklifler);
      toast.success(`Teklifiniz başarili... ${sonTeklif} TL`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const ekstraTeklif = async () => {
    try {
      const ihale = await axios.get(`/api/ihale/${id}`);
      const tekliflerdb = ihale.data.ihale.teklifler;
      let sonTeklif = 0;
      if (ekstraartis < artismiktar) {
        setOpen(false);
        toast.error(`Minimum artis miktari ${artismiktar} TL'dir`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
        return;
      }
      if (!ekstraartis) {
        return;
      }
      if (tekliflerdb.length === 0) {
        sonTeklif = verilenteklif + parseInt(ekstraartis);
      }
      if (tekliflerdb.length !== 0) {
        sonTeklif = ihale.data.ihale.teklifler[0].teklif + parseInt(ekstraartis);
      }
      const yeniTeklifler = [{ _id: user._id, teklif: sonTeklif }, ...teklifler];
      await socketRef.current.emit("teklif", {
        teklifler: yeniTeklifler,
        id,
      });
      await axios.patch(`/api/ihale/${id}`, { teklifler: yeniTeklifler });
      setTeklifler(yeniTeklifler);
      setOpen(false);
      setEkstraartis("");
      toast.success(`Teklifiniz başarili... ${sonTeklif} TL`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      {loading ? (
        <div className="container w-full h-[80vh] flex justify-center items-center">
          <ClipLoader color="#f86c6b" loading={loading} size={150} />
        </div>
      ) : (
        <div className="container ">
          <div className="grid grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2 mt-10 lg:col-span-2">
              {teklifler.length === 0 && <h1 className="text-center text-3xl text-red-600 mt-32">VERİLMİŞ TEKLİF YOKTUR</h1>}
              {verilenteklif && <ToastContainer />}
              {teklifler &&
                teklifler.map((item, index) => (
                  <div className={`flex flex-col justify-between p-[6px] items-center border-4 border-black rounded-lg ${index === 0 ? "bg-green-300 hover:bg-green-400" : "bg-red-300 hover:bg-red-400"}`}>
                    <div className="text-center">Teklif veren = {item._id}</div>
                    <div>
                      {index === 0 ? <span>Güncel teklif = </span> : <span>Eski teklif = </span>}
                      {item.teklif} TL
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-col justify-start items-end space-y-5 mt-10 ml-4">
              <div className="bg-gray-400 text-black w-full  py-20 flex space-x-6 items-center justify-center rounded-md font-bold shadow-lg">
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
                <div className="bg-gray-400 w-full h-[220px] border text-white text-center rounded-md flex flex-col justify-center items-center space-y-8 shadow-lg">
                  <div className="flex justify-center space-x-10 items-center">
                    <button
                      className="bg-green-500 hover:bg-green-600 p-3 mt-5"
                      onClick={() => {
                        setOpen(true);
                      }}
                    >
                      Arttırılmış Teklif
                    </button>
                    <button onClick={teklifVer} className="bg-green-500 hover:bg-green-600 p-3 mt-5">
                      Teklif ver
                    </button>
                  </div>
                  <div className="flex flex-col text-black">
                    <div className="hover:text-zinc-300 font-semibold">Artış Miktarı = {artismiktar} TL</div>
                    <div className="text-xs">(Arttırılmış Teklif ile Ekstra Artış Sağlayabilirsiniz)</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Modal
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="flex flex-col justify-center items-center">
                <input
                  className="text-black"
                  type="number"
                  onChange={(e) => {
                    setEkstraartis(e.target.value);
                  }}
                />
                <button className="bg-green-500 p-3 mt-5" onClick={ekstraTeklif}>
                  Teklif Ver
                </button>
              </div>
            </Box>
          </Modal>
          <div
            className="fixed right-14 bottom-8 text-4xl cursor-pointer"
            onClick={() => {
              navigate(`/chat/${id}`);
            }}
          >
            <i className="fa-brands fa-rocketchat"></i>
          </div>
        </div>
      )}
    </div>
  );
};
