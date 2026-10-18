import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";

export default function DemoNotice({ feature }) {
  const { setUserIsLoggedIn } = useContext(authContext);

  return (
    <div className="alert alert-info text-center my-5">
      <h4 className="fw-bold">You're browsing in demo mode</h4>
      <p className="mb-3">The {feature} is saved on the server, so it needs a real account. Everything else is open to explore.</p>
      <Link to="/register" onClick={() => setUserIsLoggedIn(false)} className="btn bg-main text-white">
        Create a free account
      </Link>
    </div>
  );
}
