import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "./deneme.css";
import * as api from "../../api/index";

export const CategorySlider = () => {
  //const { clickcategory, setClickcategory } = useCategoryContext();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const category = await api.fetchCategory();
      setCategories(category.data.category);
    };
    fetchCategories();
  }, []);
  const navigate = useNavigate();
  const settings = {
    className: "center",
    infinite: true,
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(`Slider Changed to: ${index + 1}, background: #222; color: #bada55`);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container mt-5">
      <Slider {...settings}>
        <div className="flex justify-center items-center content h-28 bg-slate-300 hover:bg-slate-400 rounded-md cursor-pointer transition-all duration-300">
          <i className="fa fa-bars text-2xl text-center"></i>
          <p>Tüm İhaleler</p>
        </div>
        {categories.map((item) => (
          <div
            key={item._id}
            onClick={() => {
              //setClickcategory(item.category);
              navigate(`/kategori/${item.category}`);
            }}
            className="content h-28 bg-slate-300 hover:bg-slate-400 rounded-md cursor-pointer transition-all duration-300"
          >
            {item.category.toUpperCase()}
          </div>
        ))}
      </Slider>
    </div>
  );
};
