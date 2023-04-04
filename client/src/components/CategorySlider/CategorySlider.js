import { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, makeStyles } from "@material-ui/core";
import * as api from "../../api/index";
import img from "../../assets/ihale2.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CategorySlider.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    marginLeft: 20,
    cursor: "pointer",
    transition: "transform 0.2s",
    backgroundColor: "#f5f5f5",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "0 0 5px 1px rgba(0,0,0,0.3)",
    },
  },
  media: {
    height: 180,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
  },
}));

export const CategorySlider = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const category = await api.fetchCategory();
      setCategories(category.data.category);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/kategori/${category}`);
  };

  return (
    <div className="mt-16 pb-8">
      <div className="container mt-8">
        <h1 className="ml-2 mb-8 text-3xl text-green-500">KATEGORİLER</h1>
        <Slider
          className="category-slider"
          infinite={true}
          slidesToShow={5}
          swipeToSlide={true}
          responsive={[
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
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
          ]}
        >
          <Card
            className={classes.root}
            onClick={() => {
              navigate("/allproducts");
            }}
          >
            <CardMedia className={classes.media} image={img} title="Tüm İhaleler" />
            <CardContent className={classes.center}>
              <Typography gutterBottom variant="h6" component="h2">
                Tüm İhaleler
              </Typography>
            </CardContent>
          </Card>

          {categories.map((item) => (
            <Card
              key={item._id}
              className={classes.root}
              onClick={() => {
                handleCategoryClick(item.category);
              }}
            >
              <CardMedia className={classes.media} image={item.image} title={item.category} />
              <CardContent className={classes.center}>
                <Typography gutterBottom variant="h6" component="h2">
                  {item.category.toUpperCase()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Slider>
      </div>
    </div>
  );
};
