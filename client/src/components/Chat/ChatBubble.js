import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ChatBubble = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log("Oda id = ", id);
        const response = await axios.get(`/api/chat/${id}`);
        console.log(response.data.messages);
        setMessages(response.data.messages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, []);
  // useEffect(() => {
  //   socketRef.current.on("messageGonder", (data) => {
  //     console.log("Data = ", data);
  //     // const teklifVeren = data.teklifVeren;
  //     setMessages([...data.messages]);
  //   });
  //   console.log("Socket değişti");
  // }, [socketRef.current]);
  return (
    <div className="container">
      {messages &&
        messages.map((item) => (
          <div key={item._id} className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <div className="chat-header">
              {item.gonderici.name}
              <time className="text-xs opacity-50 ml-2">2 hours ago</time>
            </div>
            {item.chat_id.admin_id === item.gonderici._id ? <div className="chat-bubble chat-bubble-primary">{item.icerik}</div> : <div className="chat-bubble">{item.icerik}</div>}
            {/* <div className="chat-footer opacity-50">Seen</div> */}
          </div>
        ))}
    </div>
  );
};
