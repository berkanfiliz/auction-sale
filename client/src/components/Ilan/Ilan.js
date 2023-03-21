import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import img from "../../assets/kitap.jpg";

export const Ilan = () => {
  const [value, setValue] = useState(4);
  const [isFavorite, setIsFavorite] = useState(false);

  function handleFavoriteClick() {
    setIsFavorite(!isFavorite);
  }

  return (
    <div className="container">
      <div className="flex flex-col w-72 mt-5 shadow-lg transform transition duration-200 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-400">
        <img className="w-full h-full object-cover" src={img} alt="" />
        <div className="container  bg-white">
          <div className="flex flex-col space-y-4 ml-4">
            <span className="text-sm mt-2">Son tarih : 10.10.2021 05:30</span>
            <p className="text-3xl">BURASI BAŞLIK </p>
            <p className="text-md mr-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, unde...</p>
            <div>
              <p className="text-center mr-4 text-red-600">GÜNCEL TEKLİF</p>
              <p className="text-xl text-center mr-4 text-red-600 underline">5500 TL</p>
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
                <button className="bg-yellow-400 w-full rounded-md  text-white py-2">KATIL</button>
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

      {/* <div className="w-full border border-black rounded-md mt-5 p-5 mr-5 shadow-2xl">
        <div className="text-center">Deneme1</div>
      </div> */}
    </div>
  );
};
