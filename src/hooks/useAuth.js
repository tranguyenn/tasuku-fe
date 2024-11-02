import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  console.log("use auth")
  return useContext(AuthContext);
};

export default useAuth;