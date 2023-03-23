import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { useAuthContext } from "../hooks/useAuthContext";
const socket = io.connect("http://localhost:4000");

export const ContentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();
  const sendData = () => {
    if (user) {
      socket.emit("sendData", { id: user._id });
      navigate(`/room/${id}`);
    } else {
      navigate(`/login`);
    }
  };

  console.log("İd = " + id);
  return (
    <div>
      Content
      <button className="bg-red-500 ml-10 p-3 flex justify-center items-center" onClick={sendData}>
        TEKLİF ODASİNA GİT
      </button>
    </div>
  );
};
