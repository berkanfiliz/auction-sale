import { createContext, useReducer, useEffect } from "react";

import { AuthReducer } from "../reducers/AuthReducer";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  useEffect(() => {
    const kullanici = JSON.parse(localStorage.getItem("user"));
    if (kullanici) {
      dispatch({ type: "LOGIN", payload: kullanici });
    }
  }, []);

  const [state, dispatch] = useReducer(AuthReducer, { user: null });
  console.log(state);
  return <AuthContext.Provider value={{ dispatch, ...state }}>{children}</AuthContext.Provider>;
};
