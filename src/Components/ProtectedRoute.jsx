import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";
import DemoNotice from "./DemoNotice";

export default function ProtectedRoute({ children, needsAccount }) {
  const { userIsLoggedIn, isDemo } = useContext(authContext);
  const location = useLocation();

  if (!userIsLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (isDemo && needsAccount) {
    return <DemoNotice feature={needsAccount} />;
  }

  return children;
}
