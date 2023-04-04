import React from "react";
import img from "../../assets/woman-laptop-paint.png";
import { useNavigate } from "react-router-dom";

export const TopSection = () => {
  const navigate = useNavigate();
  return (
    <div className="pb-8">
      <div className="container mt-10">
        <div className="flex justify-around items-center flex-col md:flex-row">
          <div className="container flex flex-col space-y-10 md:items-start md:w-1/2">
            <h1 className="text-4xl text-center font-bold md:text-left font-mono">İHALE SİTESİNE HOŞGELDİNİZ</h1>
            <h3 className="text-center text-lg font-medium">İhalelere katılın, yeni ürünler keşfedin ve bu maceraya atılın.</h3>
            <button className="bg-green-400 hover:bg-green-500 text-white text-center py-2 rounded-md font-medium w-1/2 mx-auto md:mx-0" onClick={() => navigate("/allproducts")}>
              İHALE KEŞFET
            </button>
          </div>
          <img className="w-full h-auto md:w-1/2" src={img} alt="" />
        </div>
      </div>
    </div>
  );
};
