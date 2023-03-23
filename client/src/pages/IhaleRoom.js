import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

export const IhaleRoomPage = () => {
  const { id } = useParams();

  const [verilenteklif, setVerilenteklif] = useState(18);
  const [teklifler, setTeklifler] = useState([]);
  //const [ihale, setIhale] = useState([]);

  //socket.emit("room", { deneme: "berkan" });

  //ilk sayfa yüklendiği zaman
  useEffect(() => {
    socket.emit("room", id);
    console.log("Buraya girdi ilk yüklenme");
    const tekliflerDoldur = async () => {
      const ihale = await axios.get(`/api/ihale/${id}`);
      const teklifdb = ihale.data.ihale.teklifler;
      setTeklifler(teklifdb);
    };
    tekliflerDoldur();
    return () => {
      console.log("Buraya girdi temizleme fonksiyonu");
      socket.disconnect(); // Socket bağlantısını kes
    };
  }, []);

  //socket devreye girdiği zaman yani teklifverden hemen sonra
  useEffect(() => {
    console.log("Buraya girdi socketin değişmesi");
    const ihaleGetir = async () => {
      await socket.on("messageReturn", (data) => {
        console.log("Data = ", data);
        const teklif = data.teklifler;
        console.log("Teklif = " + teklif);
        setTeklifler([teklif]);
      });
    };
    ihaleGetir();
  }, [socket]);

  //teklif ver tuşuna basıldığı zaman
  const teklifVer = async () => {
    setTeklifler([...teklifler, verilenteklif]);

    console.log("Tekliflerim = " + teklifler);
    socket.emit("teklif", {
      teklifler,
      id,
    });
    const verilenteklifdb = await axios.patch(`/api/ihale/${id}`, { teklifler });

    //console.log("db'den gelen sonuç= ", verilenteklifdb);
  };

  return (
    <div>
      Ihale Room Page
      <button onClick={teklifVer} className="bg-blue-600 p-3 ml-64">
        Teklif ver
      </button>
      {teklifler && teklifler.map((item) => <div>{item}</div>)}
    </div>
  );
};
