import React from "react";
import { useParams } from "react-router-dom";

export const ContentPage = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Content</div>;
};
