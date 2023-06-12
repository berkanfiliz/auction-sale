import React, { useEffect, useState } from "react";
import img from "../../assets/woman-laptop-paint.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import moment from "moment";
import "moment/locale/tr";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const Favorites = () => {
  const [ihale, setIhale] = useState([]);

  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFavoritesIhale = async () => {
      try {
        const response = await axios.get(`api/ihale/favorites/${user._id}`);
        setIhale(response.data.favoriteIhaleler);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavoritesIhale();
  }, []);

  const handleFavoriteClick = async (id) => {
    try {
      const updatedIhale = ihale.filter((item) => item._id !== id);
      if (updatedIhale.length === 0) {
        setIhale([]);
        const response = await axios.patch(`/api/user/${user._id}`, { favorites: [] });
        toast.success("Favorilerden çıkarıldı", { autoClose: 2000 });
        return;
      }
      const favoritesId = updatedIhale.map((item) => item._id);
      const response = await axios.patch(`/api/user/${user._id}`, { favorites: [favoritesId] });
      setIhale(updatedIhale);
      toast.success("Favorilerden çıkarıldı", { autoClose: 2000 });
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
            <div className="flex flex-col justify-around px-4 items-end relative">
              <div className="">
                <p>
                  <span className="font-bold">Bitiş Tarihi: </span>
                  {moment(item.bitis_tarih).format("llll")}
                </p>
                <p>
                  <span className="font-bold">İhale Durumu:</span> {item.durum ? "Aktif" : "Pasif"}
                </p>
              </div>
              <button onClick={() => handleFavoriteClick(item._id)} className="absolute text-2xl top-3 right-3">
                <FontAwesomeIcon className="hover:text-red-500" icon={faHeart} color={"#ff0000"} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
