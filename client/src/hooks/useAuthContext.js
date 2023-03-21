import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("Context yüklenmedi");
  }
  return context;
};
