import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export const Yetkisiz = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center h-screen font-serif">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">ADMİN YETKİNİZ YOKTUR</h1>
        <p className="text-lg text-gray-600 mb-8">Üzgünüz, admin paneline erişim yetkiniz bulunmamaktadır.</p>
        <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded font-bold text-lg" onClick={handleGoHome}>
          <FaHome className="mr-2" />
          ANASAYFAYA DÖN
        </button>
      </div>
    </div>
  );
};
