import { useState } from "react";
import { UseAuthContext } from "./useAuthContext";
import * as api from "../api/index";

export const useLogin = () => {
  const [hata, setHata] = useState(null);
  const { dispatch } = UseAuthContext();

  const login = async (email, password) => {
    // const response = await fetch("/api/user/login", {
    //   method: "POST",
    //   body: JSON.stringify({ email, password }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const json = await response.json();
    try {
      const data = { email, password };
      const response = await api.login(data);
      return response;
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return { login };
};
