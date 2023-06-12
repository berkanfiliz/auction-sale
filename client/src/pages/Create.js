import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchCategory } from "../api";
import Dropzone from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthContext } from "../hooks/useAuthContext";

export const CreatePage = () => {
  const { user } = useAuthContext();

  const [kategori, setKategori] = useState([]);
  const [images, setImages] = useState([]);
  const [basarili, setBasarili] = useState(false);
  const [hata, setHata] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);

  // İhale Bilgileri
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [ihaleKategori, setIhaleKategori] = useState("kitap");
  const [tarih, setTarih] = useState("");
  const [baslangicfiyat, setBaslangicfiyat] = useState("");
  const [artismiktar, setArtismiktar] = useState("");
  const [satisyuzde, setSatisYuzde] = useState("");

  const handleDrop = (acceptedFiles) => {
    const files = acceptedFiles.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });
    setImages((prevImages) => [...prevImages, ...files]);
    setUploadImages((prevUploadImages) => [...prevUploadImages, ...acceptedFiles]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (uploadImages.length === 0) {
      setHata(true);
      return;
    }

    if (new Date(tarih) < new Date()) {
      setBasarili(true);
      toast.error("Geçersiz tarih! Lütfen ileri bir zaman seçiniz", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("olusturan_id", user._id);
    formData.append("bitis_tarih", tarih);
    formData.append("baslik", baslik);
    formData.append("aciklama", aciklama);
    formData.append("baslangic_fiyat", baslangicfiyat);
    formData.append("artis_miktari", artismiktar);
    formData.append("minimum_satis_yuzde", satisyuzde);
    formData.append("kategori", ihaleKategori);
    uploadImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post("/api/ihale", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // const response = await axios.post("/api/ihale", formData, {
      //   headers: {
      //     Authorization: `Bearer ${user.accessToken}`,
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      setBasarili(true);
      toast.success("İhale oluşturma işlemi başarılı", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      setBaslik("");
      setAciklama("");
      setIhaleKategori("kitap");
      setTarih("");
      setBaslangicfiyat("");
      setArtismiktar("");
      setSatisYuzde("");
      setImages([]);
    } catch (error) {
      toast.error("Lütfen tüm alanları eksiksiz doldurun", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      const category = await fetchCategory();
      setKategori(category.data.category);
    };
    getCategory();
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleClick} className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
        <div className="flex flex-col justify-center items-center mt-10">
          <label className="w-full" htmlFor="baslik">
            İhale Başlığınız
          </label>
          <input id="baslik" value={baslik} onChange={(e) => setBaslik(e.target.value)} className="w-full bg-gray-200" type="text" required />
          <label className="w-full" htmlFor="aciklama">
            İhale Açıklamanız
          </label>
          <textarea id="aciklama" value={aciklama} onChange={(e) => setAciklama(e.target.value)} className="w-full bg-gray-200 h-24" type="text" required />
          <label className="w-full" htmlFor="kategori">
            İhale Kategori
          </label>
          <select id="kategori" onChange={(e) => setIhaleKategori(e.target.value)} className="w-full p-1 bg-gray-200">
            {kategori &&
              kategori.map((item) => (
                <option key={item._id} value={item.category}>
                  {item.category}
                </option>
              ))}
          </select>
          <label className="w-full" htmlFor="tarih" required>
            Bitiş Tarihi
          </label>
          <input id="tarih" value={tarih} onChange={(e) => setTarih(e.target.value)} className="w-full bg-gray-200" type="datetime-local" required />
          <label className="w-full" htmlFor="fiyat">
            Başlangıç Fiyatı
          </label>
          <input id="fiyat" value={baslangicfiyat} onChange={(e) => setBaslangicfiyat(e.target.value)} className="w-full bg-gray-200" type="number" required />
          <label className="w-full" htmlFor="artis">
            Artış Miktarı
          </label>
          <input id="artis" value={artismiktar} onChange={(e) => setArtismiktar(e.target.value)} className="w-full bg-gray-200" type="text" required />
          <label className="w-full" htmlFor="minsatis">
            Minimum Satış Yüzdesi
          </label>
          <input id="minsatis" value={satisyuzde} onChange={(e) => setSatisYuzde(e.target.value)} className="w-full bg-gray-200" type="number" required />
        </div>
        <div className="flex flex-col justify-center items-center space-y-10">
          {images.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image.preview} alt={`Resim ${index}`} className="w-48 h-48 object-cover" />
                </div>
              ))}
            </div>
          ) : (
            <Dropzone onDrop={handleDrop} accept="image/*" multiple>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <p className="text-gray-400 border border-black p-16">Resimleri buraya sürükleyin ya da tıklayın</p>
                </div>
              )}
            </Dropzone>
          )}
          {hata && <div className="text-red-600">Lütfen en az bir resim yükleyin</div>}
        </div>
        <div className="flex justify-center items-center">
          <button type="submit" className="bg-green-400 hover:bg-green-600 text-white px-6 py-2 rounded-lg focus:outline-none">
            İhale Oluştur
          </button>
        </div>
      </form>
      {basarili && <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />}
    </div>
  );
};
