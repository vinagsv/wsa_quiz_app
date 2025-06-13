import { useSelector } from "react-redux";

export const useAuthState = () => {
  return useSelector((state) => state.auth);
};
