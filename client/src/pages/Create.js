import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchCategory } from "../api";
import Dropzone from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../hooks/useAuthContext";

export const CreatePage = () => {
  const [kategori, setKategori] = useState([]);
  const [image, setImage] = useState("");
  const [basarili, setBasarili] = useState(false);

  const { user } = useAuthContext();

  console.log(user);

  //İhale Bilgileri
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [ihaleKategori, setIhaleKategori] = useState("kitap");
  const [tarih, setTarih] = useState("");
  const [baslangicfiyat, setBaslangicfiyat] = useState("");
  const [artismiktar, setArtismiktar] = useState("");
  const [satisyuzde, setSatisYuzde] = useState("");

  const handleDrop = (acceptedFiles) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(acceptedFiles[0]);
  };
  const handleClick = async () => {
    const ihale = {
      olusturan_id: user._id,
      bitis_tarih: tarih,
      baslik,
      aciklama,
      baslangic_fiyat: baslangicfiyat,
      artis_miktari: artismiktar,
      minimum_satis_yuzde: satisyuzde,
      kategori: ihaleKategori,
    };
    try {
      const response = await axios.post("/api/ihale", ihale);
      setBasarili(true);
      toast.success("İhale olusturma islemi basarili", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      console.log(response);
      setBaslik("");
      setAciklama("");
      setIhaleKategori("kitap");
      setTarih("");
      setBaslangicfiyat("");
      setArtismiktar("");
      setSatisYuzde("");
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      const category = await fetchCategory();
      console.log(category.data.category);
      setKategori(category.data.category);
    };
    getCategory();
  }, []);

  return (
    <div className="container">
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-center items-center mt-10">
          <label className="w-2/3" htmlFor="">
            İhale Basliginiz
          </label>
          <input value={baslik} onChange={(e) => setBaslik(e.target.value)} className="w-2/3 bg-gray-200" type="text" />
          <label className="w-2/3" htmlFor="">
            İhale Aciklamaniz
          </label>
          <textarea value={aciklama} onChange={(e) => setAciklama(e.target.value)} className="w-2/3 bg-gray-200 h-24" type="text" />
          <label className="w-2/3" htmlFor="">
            İhale Category
          </label>
          <select onChange={(e) => setIhaleKategori(e.target.value)} className="w-2/3 bg-gray-200">
            {kategori &&
              kategori.map((item) => (
                <option key={item._id} value={item.category}>
                  {item.category}
                </option>
              ))}
          </select>
          <label className="w-2/3" htmlFor="">
            Bitis Tarihi
          </label>
          <input value={tarih} onChange={(e) => setTarih(e.target.value)} className="w-2/3 bg-gray-200" type="datetime-local" />
          <label className="w-2/3" htmlFor="">
            Baslangic Fiyat
          </label>
          <input value={baslangicfiyat} onChange={(e) => setBaslangicfiyat(e.target.value)} className="w-2/3 bg-gray-200" type="number" />
          <label className="w-2/3" htmlFor="">
            Artis Miktari
          </label>
          <input value={artismiktar} onChange={(e) => setArtismiktar(e.target.value)} className="w-2/3 bg-gray-200" type="text" />
          <label className="w-2/3" htmlFor="">
            Minimum Satis Yuzdesi
          </label>
          <input value={satisyuzde} onChange={(e) => setSatisYuzde(e.target.value)} className="w-2/3 bg-gray-200" type="number" />
        </div>
        <div className="flex flex-col justify-center items-center space-y-10">
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="h-[250px] w-[70%] border border-black rounded-sm bg-white">
                <input {...getInputProps()} />
                {image ? (
                  <img src={image} alt="selected" style={{ height: "100%", width: "100%" }} />
                ) : (
                  <div className="text-center mt-10 flex flex-col space-y-4">
                    <i className="fa-solid fa-upload text-[100px]"></i>
                    <p>CHOOSE YOUR IMAGE</p>
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          <button className="bg-red-400 py-2 px-4 rounded-md" onClick={handleClick}>
            KAYDET
          </button>
          {basarili && <ToastContainer />}
        </div>
      </div>
    </div>
  );
};
