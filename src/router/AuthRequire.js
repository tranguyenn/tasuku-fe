import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../organisms/form/LoadingScreen";


function AuthRequire({ children }) {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation();
 console.log("check authen",isInitialized)
 console.log("check aujthrn", isAuthenticated)
  if (!isInitialized) {
     return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthRequire;