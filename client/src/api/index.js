import axios from "axios";

export const getUser = () => {
  const user = axios.get("/api/user/getUsers");
  return user;
};

export const login = (data) => {
  const login = axios.post("/api/login", data);
  return login;
};

export const fetchCategory = () => {
  const categories = axios.get("/api/category");
  return categories;
};

export const fetchWithCategoryFilter = (data) => {
  const ihale = axios.get(`/api/ihale/kategori/${data}`);
  return ihale;
};
