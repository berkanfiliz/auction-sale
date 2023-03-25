import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import * as api from "../api/index";

export const useLogin = () => {
  //const [hata, setHata] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    try {
      const data = { email, password };
      const response = await api.login(data);
      const user = { _id: response.data.data._id, accessToken: response.data.accessToken };
      dispatch({ type: "LOGIN", payload: user });
      localStorage.setItem("user", JSON.stringify(user));
      console.log(response);
      return response;
    } catch (error) {
      //console.log(error.response.data);
      //setHata(error.response.data.message);
      return error.response;
      //return error.response.data.message;
    }
  };
  return { login };
};
