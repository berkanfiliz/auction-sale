import React, { useEffect, useState } from "react";
import img from "../../assets/woman-laptop-paint.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import moment from "moment";
import "moment/locale/tr";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export const Ilan = () => {
  const [ihale, setIhale] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMyIhale = async () => {
      try {
        const response = await axios.get(`api/ihale/myihale/${user._id}`);
        setIhale(response.data.ihale);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyIhale();
  }, []);
  const changeActiveFunction = async (id, isActive) => {
    confirmAlert({
      title: "Emin misiniz?",
      message: "Durumu değiştirmek istediğinizden emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () => {
            updateIhale(id);
          },
        },
        {
          label: "Hayır",
          onClick: () => {},
        },
      ],
    });
  };

  const updateIhale = async (id) => {
    try {
      const updatingIhale = ihale.filter((item) => item._id === id);
      const myihale = ihale.filter((item) => item._id !== id);
      const response = await axios.patch(`api/ihale/${id}`, { ...updatingIhale, durum: false });

      setIhale([...myihale, response.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container font-serif flex flex-col space-y-6">
      {/* Card */}
      {ihale &&
        ihale.map((item) => (
          <div className="grid grid-cols-3 justify-between shadow-md shadow-slate-400 transform transition duration-200 hover:-translate-y-4 hover:shadow-2xl hover:shadow-green-400 rounded-xl p-3">
            <div onClick={() => navigate(`/kategori/${item.kategori}/${item._id}`)} key={item._id} className="col-span-2 grid grid-cols-3 gap-x-6 cursor-pointer">
              <div className="w-60 h-48">
                <img src={`http://localhost:4000/` + item.image_urls[0]} alt="" className="object-cover w-full h-full" />
              </div>
              <div className="col-span-2 flex flex-col justify-between px-4">
                <div className="text-xl font-bold mb-2 overflow-hidden overflow-ellipsis mt-3">{item.baslik} </div>
                <div className="mb-2">
                  <p>Başlangıç Fiyat: {item.baslangic_fiyat} TL</p>
                  {item.teklifler.length > 0 ? <p> Güncel Teklif: {item.teklifler[0].teklif} TL</p> : <p>Güncel Teklif: Guncel Teklif yoktur </p>}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-around px-4 items-end">
              <div className="">
                <p>
                  <span className="font-bold">Bitiş Tarihi: </span>
                  {moment(item.bitis_tarih).format("llll")}
                </p>
                <p>
                  <span className="font-bold">İhale Durumu:</span> {item.durum ? "Aktif" : "Pasif"}
                </p>
              </div>
              {item.durum && (
                <div className="mt-4">
                  <button
                    className="bg-red-400 px-4 py-2 rounded mb-10 mr-10"
                    onClick={() => {
                      if (item.teklifler.length > 0) {
                        toast.error("Teklif var ihale pasif hale getirilemez!!!", {
                          position: toast.POSITION.TOP_CENTER,
                          autoClose: 2000,
                        });
                      } else {
                        changeActiveFunction(item._id);
                      }
                    }}
                  >
                    İhaleyi Pasif Yap
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      <ToastContainer />
    </div>
  );
};
