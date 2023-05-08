import React, { useEffect, useState } from "react";
import axios from "axios";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const category = await axios.get("/api/category");
        setCategories(category.data.message);
        console.log("Categories ", category.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  return (
    <div>
      <button className="bg-red-400 p-3 hover:bg-red-600">CREATE CATEGORY</button>
    </div>
  );
};
