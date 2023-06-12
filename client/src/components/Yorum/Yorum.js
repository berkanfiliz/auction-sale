import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Resimsiz from "../../assets/resimsiz.jpeg";
import moment from "moment";
import "moment/locale/tr";

import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

export const Yorum = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();
  const [dbyorumlar, setDbYorumlar] = useState([]);
  const [yorum, setYorum] = useState("");

  useEffect(() => {
    const fetchYorumlar = async () => {
      try {
        const response = await axios.get(`/api/ihale/yorumlar/${id}`);
        setDbYorumlar(response.data.yorumlar);
      } catch (error) {
        console.error(error);
      }
    };
    fetchYorumlar();
  }, []);
  const yorumYap = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        navigate("/login");
        return;
      }
      const yorumlar = [{ kullanici_id: user, yorum }, ...dbyorumlar];
      const response = await axios.patch(`/api/ihale/${id}`, { yorumlar });

      const yorumlarDb = await axios.get(`/api/ihale/yorumlar/${id}`);

      setDbYorumlar(yorumlarDb.data.yorumlar);
    } catch (error) {
      console.log("error");
    }

    setYorum("");
  };
  return (
    <div className="mt-10 w-full lg:w-2/3 container">
      <form onSubmit={yorumYap} className="bg-gray-100 rounded-lg p-4 mb-4">
        <h3 className="text-lg font-semibold mb-4">Yorum Yaz</h3>
        <div className="mb-4">
          <textarea onChange={(e) => setYorum(e.target.value)} value={yorum} className="block w-full border-gray-300 rounded-md shadow-sm p-2" rows="4" placeholder="Yorumunuzu buraya yazın" required></textarea>
        </div>
        <div className="text-right">
          <button className="inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:bg-red-800 focus:outline-none">Gönder</button>
        </div>
      </form>
      <h2 className="text-xl font-semibold mb-4 mt-10">Yorumlar</h2>
      {dbyorumlar.length > 0 &&
        dbyorumlar.map((yorum) => (
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-4 mb-4">
              {yorum.kullanici_id.image_urls[0] ? <img src={`http://localhost:4000/${yorum.kullanici_id.image_urls[0]}`} className="h-10 w-10 rounded-full overflow-hidden" /> : <img src={Resimsiz} className="h-10 w-10 rounded-full overflow-hidden" />}
              <div>
                <div className="font-semibold">{yorum.kullanici_id.name}</div>
                <div className="text-gray-500 text-sm">{moment(yorum.tarih).format("llll")}</div>
              </div>
            </div>
            <div className="text-gray-700">{yorum.yorum}</div>
          </div>
        ))}
    </div>
  );
};
