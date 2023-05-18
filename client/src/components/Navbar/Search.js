import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";

export const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/ihale/search?q=${query}`);
      // Verileri işleyin veya kullanın
      console.log(response.data);
      if (response.data.ihale.length == 0) {
        toast.error(`Arama Sonucu Bulunamadi`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        navigate(`/allproducts?q=${query}`);
      }
    } catch (error) {
      console.log(error);
    }
    setQuery("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClick = () => {
    handleSearch();
  };

  return (
    <div className="relative">
      <input className="w-36 sm:w-40 md:w-72 border-2 rounded-full p-2 relative focus:border-green-400" type="text" placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} onKeyPress={handleKeyPress} />
      <div>
        <i className="absolute right-3 top-1 bg-green-400 fa-solid fa-magnifying-glass border rounded-full p-2" onClick={handleClick}></i>
      </div>
      <ToastContainer />
    </div>
  );
};
