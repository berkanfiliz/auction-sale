import { UseAuthContext } from "./useAuthContext";
import { useNotContext } from "./useNotContext";
export const useLogout = () => {
  const { dispatch } = UseAuthContext();
  const { dispatch: notDispatch } = useNotContext();
  const logout = () => {
    localStorage.removeItem("user");
    notDispatch({ type: "NOT_DOLDUR", payload: null });
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
