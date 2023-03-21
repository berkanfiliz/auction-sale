import axios from "axios";

export const getUser = () => {
  return axios.get("/api/user/getUsers");
};

export const login = (data) => {
  return axios.post("/api/login", data);
};

export const fetchCategory = () => {
  return axios.get("/api/category");
};

export const fetchWithCategoryFilter = (data) => {
  return axios.get(`/api/ihale/kategori/${data}`);
};
