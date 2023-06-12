import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import "moment/locale/tr";
import { ScrollButton } from "../components/ScrolButton/ScrolButton";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

export const AllProductPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [value, setValue] = useState(4);
  const [ihale, setIhale] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  //Burda yapılan işlem eğer user varsa favorilerini çekip yerleştiriyoruz. Eğer user yoksa favoriler çalışmıyor.
  useEffect(() => {
    const fetch = async () => {
      const ihaleresponse = await axios.get("/api/ihale");
      const ihaleData = ihaleresponse.data.ihale;
      setIhale(ihaleData);

      const userresponse = await axios.get(`/api/user/${user._id}`);
      const favoriler = userresponse.data.message.favorites;
      setFavorites(favoriler);

      if (favoriler.length > 0) {
        const favorileriDoldur = ihaleData.map((item) => {
          if (favoriler.includes(item._id)) {
            return {
              ...item,
              favorite: true,
            };
          }
          return item;
        });
        setIhale(favorileriDoldur);
      }
    };

    if (user) {
      fetch();
    } else {
      const fetchIhale = async () => {
        try {
          const ihaleresponse = await axios.get("/api/ihale");
          const ihaleData = ihaleresponse.data.ihale;
          setIhale(ihaleData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchIhale();
    }
  }, [user]);

  //Burda yapılan arana search işlem ise eğer user varsa favorilerini çekip yerleştiriyoruz. Eğer user yoksa favoriler çalışmıyor.
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/api/ihale/search?q=${query}`);
        const searchData = response.data.ihale;
        setIhale(searchData);

        const userresponse = await axios.get(`/api/user/${user._id}`);
        const favoriler = userresponse.data.message.favorites;
        setFavorites(favoriler);

        if (favoriler.length > 0) {
          const favorileriDoldur = searchData.map((item) => {
            if (favoriler.includes(item._id)) {
              return {
                ...item,
                favorite: true,
              };
            }
            return item;
          });
          setIhale(favorileriDoldur);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (query) {
      if (user) {
        fetchSearchResults();
      } else {
        const fetchSearchResults = async () => {
          try {
            const response = await axios.get(`/api/ihale/search?q=${query}`);
            setIhale(response.data.ihale);
          } catch (error) {
            console.log(error);
          }
        };
        fetchSearchResults();
      }
    }
  }, [query]);

  const handleFavoriteClick = async (id) => {
    if (!user) {
      navigate("/login");
    } else {
      const updatedIhale = ihale.map((item) => {
        if (item._id === id) {
          if (favorites.includes(id)) {
            // eğer id favorilerde ise, favorilerden kaldır
            const newFavorites = favorites.filter((fav) => fav !== id);
            setFavorites(newFavorites);
            toast.success(`Favorilerden kaldırma basarili`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
          } else {
            // değilse, favorilere ekle
            const newFavorites = [...favorites, id];
            setFavorites(newFavorites);
            toast.success(`Favorilere ekleme basarili`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 2000,
            });
          }
          // ilgili öğenin favori durumunu tersine çevir
          return {
            ...item,
            favorite: !item.favorite,
          };
        }
        return item;
      });
      setIhale(updatedIhale);
      const favoritesIhale = updatedIhale.filter((item) => item.favorite === true);
      let favoritesid = [];
      favoritesIhale.map((item) => {
        favoritesid.push(item._id);
      });

      // favori değişikliklerini sunucuya kaydetmek için bir API çağrısı yapabilirsiniz
      try {
        const response = await axios.patch(`/api/user/${user._id}`, { favorites: favoritesid });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const filteredIhale = ihale.filter((item) => item.durum === true);

  return (
    <div className="container mt-10">
      <ScrollButton />
      {ihale && <ToastContainer />}
      <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredIhale.map((item) => (
          <div key={item._id} className="flex flex-col w-72 shadow-md shadow-slate-400 transform transition duration-200 hover:-translate-y-4 hover:shadow-2xl hover:shadow-red-400">
            <img
              onClick={() => {
                navigate(`/kategori/${item.kategori}/${item._id}`);
              }}
              className="w-full h-[230px] object-fiil cursor-pointer"
              src={`http://localhost:4000/` + item.image_urls[0]}
              alt=""
            />
            <div className="container bg-white">
              <div className="flex flex-col space-y-4 ml-2">
                <span className="text-sm mt-2">
                  <span className="font-bold">Bitiş tarihi</span> : {moment(item.bitis_tarih).format("llll")}
                </span>
                <p className="text-xl font-mono font-bold text-center">{item.baslik.length > 40 ? item.baslik.slice(0, 41) + "..." : item.baslik}</p>
                <p className="text-md mr-2" style={{ wordBreak: "break-all" }}>
                  {item.aciklama.slice(0, 135)}...
                </p>
                <div>
                  <p className="text-center mr-4 text-red-600 font-serif font-bold">BAŞLANGIÇ FİYAT</p>
                  <p className="text-xl text-center mr-4 text-red-600 font-bold font-mono">{item.baslangic_fiyat} TL</p>
                </div>
                {/* <Box
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
                </Box> */}

                <div className="flex items-center">
                  <div className=" w-1/2 mb-2">
                    <button className="bg-yellow-400 w-full rounded-md  text-white py-2" onClick={() => navigate(`/room/${item._id}`)}>
                      KATIL
                    </button>
                  </div>
                  <div className="w-1/2 ml-4 mb-2 space-x-3">
                    <button onClick={() => handleFavoriteClick(item._id)} className="p-1 px-2 rounded-md text-xl">
                      <FontAwesomeIcon className="hover:text-red-500" icon={faHeart} color={item.favorite ? "#ff0000" : "#ccc"} />
                    </button>
                    <button>
                      <i
                        className="fa-regular fa-eye  p-1 px-2 rounded-md text-xl"
                        onClick={() => {
                          navigate(`/kategori/${item.kategori}/${item._id}`);
                        }}
                      ></i>
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
