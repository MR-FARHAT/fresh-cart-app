import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { userIsLoggedIn } = useContext(authContext);
  const location = useLocation();

  if (!userIsLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
