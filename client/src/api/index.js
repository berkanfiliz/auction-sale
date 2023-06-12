import axios from "axios";

const url = "http://localhost:4000";
export const getUser = () => {
  return axios.get(`${url}/api/user/getUsers`);
};

export const login = (data) => {
  return axios.post(`${url}/api/login`, data);
};

export const fetchCategory = () => {
  return axios.get(`${url}/api/category`);
};

export const fetchWithCategoryFilter = (data) => {
  return axios.get(`${url}/api/ihale/kategori/${data}`);
};
