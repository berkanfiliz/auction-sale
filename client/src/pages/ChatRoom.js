import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import tr from "date-fns/locale/tr";

import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import resimsiz from "../assets/resimsiz.jpeg";

export const ChatRoom = () => {
  const socketRef = useRef(null);
  const { id } = useParams();
  const { user } = useAuthContext();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:8900"); //4000 e döndür olmazsa
    socketRef.current.emit("room", id);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/${id}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
    return () => {
      socketRef.current.disconnect(); // Socket bağlantısını kes
      console.log("Sayfadan ayrıldınız socket bağlantısı kesildi");
    };
  }, []);
  useEffect(() => {
    console.log("Socket değiştiiiiii");
    socketRef.current.on("messageGonder", (data) => {
      console.log("Dataaaaaaa = ", data);
      // const teklifVeren = data.teklifVeren;
      setMessages([...data.messages]);
    });
  }, [socketRef.current]);
  const handleClick = async () => {
    try {
      if (message == "") {
        return;
      }
      const response = await axios.post(`/api/chat`, {
        chat_id: `${id}`,
        gonderici: `${user._id}`,
        icerik: message,
      });
      const allMessage = await axios.get(`/api/chat/${id}`);
      setMessage("");
      setMessages(allMessage.data.messages);
      await socketRef.current.emit("message", {
        messages: allMessage.data.messages,
        id,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="">
      <div className="container pb-24">
        {messages &&
          messages.map((item) => (
            <div key={item._id} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={resimsiz} />
                </div>
              </div>
              {item.chat_id.admin_id === item.gonderici._id ? (
                <div className="chat-header">
                  {item.gonderici.name} - İhale Sahibi
                  <time className="text-xs opacity-50 ml-2"> {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: tr })}</time>
                </div>
              ) : (
                <div className="chat-header">
                  {item.gonderici.name}
                  <time className="text-xs opacity-50 ml-2"> {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: tr })}</time>
                </div>
              )}
              {item.chat_id.admin_id === item.gonderici._id ? <div className="chat-bubble chat-bubble-primary">{item.icerik}</div> : <div className="chat-bubble">{item.icerik}</div>}
            </div>
          ))}
      </div>
      <div className="bg-white fixed bottom-0 w-full py-4 shadow-lg">
        <div className="px-2 container flex">
          <input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="input w-full focus:outline-none bg-blue-100 rounded-r-none"
            type="text"
          />
          <button onClick={handleClick} type="submit" className="w-auto bg-green-500 hover:bg-green-600 text-white rounded-r-lg px-5 text-sm">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
