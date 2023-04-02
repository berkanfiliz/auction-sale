import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api/index";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/tr";
import img from "../assets/kitap.jpg";
import { ScrollButton } from "../components/ScrolButton/ScrolButton";

export const CategoryPage = () => {
  const { nesne } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState(4);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ihale, setIhale] = useState([]);

  function handleFavoriteClick() {
    setIsFavorite(!isFavorite);
  }
  useEffect(() => {
    const fetchCategories = async () => {
      const category = await api.fetchWithCategoryFilter(nesne);
      setIhale(category.data.ihale);
    };
    fetchCategories();
  }, [nesne]);

  console.log("İhale = ", ihale);
  const filteredIhale = ihale.filter((item) => item.durum === true);

  return (
    <div className="container mt-10">
      <ScrollButton />

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* 1 */}
        {filteredIhale.map((item) => (
          <div key={item._id} className="flex flex-col w-72 shadow-md shadow-slate-400 transform transition duration-200 hover:-translate-y-4 hover:shadow-2xl hover:shadow-red-400">
            <img
              onClick={() => {
                navigate(`${item._id}`);
              }}
              className="w-full h-[300px] object-contain mx-auto cursor-pointer"
              src={`http://localhost:4000/` + item.image_urls[0]}
              alt=""
            />
            <div className="container bg-white  ">
              <div className="flex flex-col space-y-4 ml-4">
                <span className="text-sm mt-2">Bitiş tarihi : {moment(item.bitis_tarih).format("llll")}</span>
                <p className="text-3xl">{item.baslik}</p>
                <p className="text-md mr-2" style={{ wordBreak: "break-all" }}>
                  {item.aciklama.slice(0, 145)}...
                </p>
                <div>
                  <p className="text-center mr-4 text-red-600">BAŞLANGIÇ FİYAT</p>
                  <p className="text-xl text-center mr-4 text-red-600 underline">{item.baslangic_fiyat} TL</p>
                </div>
                <Box
                  sx={{
                    "& > legend": { mt: 2 },
                  }}
                >
                  <Typography component="legend"></Typography>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>

                <div className="flex items-center">
                  <div className=" w-1/2 mb-2">
                    <button className="bg-yellow-400 w-full rounded-md  text-white py-2" onClick={() => navigate(`/room/${item._id}`)}>
                      KATIL
                    </button>
                  </div>
                  <div className="w-1/2 ml-4 mb-2 space-x-3">
                    <button onClick={handleFavoriteClick} className="p-1 px-2 rounded-md text-xl">
                      <FontAwesomeIcon className="hover:text-red-500" icon={faHeart} color={isFavorite ? "#ff0000" : "#ccc"} />
                    </button>
                    <button>
                      <i className="fa-regular fa-eye  p-1 px-2 rounded-md text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
