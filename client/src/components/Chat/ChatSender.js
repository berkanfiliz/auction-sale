import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

export const ChatSender = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [message, setMessage] = useState("");
  const handleClick = async () => {
    try {
      // await socketRef.current.emit("message", {
      //   messages: message,
      //   id,
      // });
      const response = await axios.post(`/api/chat`, {
        chat_id: `${id}`,
        gonderici: `${user._id}`,
        icerik: message,
      });
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };
  console.log(message);
  return (
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
        <button onClick={handleClick} type="submit" className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm">
          Send
        </button>
      </div>
    </div>
  );
};
