import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../Assets/freshcart-logo.svg";
import { authContext } from "../Contexts/AuthContext";
import { cartContext } from "../Contexts/CartContext";

const links = [
  { to: "/home", label: "Home" },
  { to: "/cart", label: "Cart" },
  { to: "/allProducts", label: "Products" },
  { to: "/categories", label: "Categories" },
  { to: "/brands", label: "Brands" },
  { to: "/allOrders", label: "Orders" },
  { to: "/wishlist", label: "Wish List" },
];

export default function Navbar() {
  const { userIsLoggedIn, setUserIsLoggedIn } = useContext(authContext);
  const { cartCount } = useContext(cartContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    setUserIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg min-nav">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          <img src={logo} alt="FreshCart" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {userIsLoggedIn && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {links.map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink className="nav-link" to={to}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              {userIsLoggedIn && (
                <Link className="text-black" to="/cart" aria-label="Cart">
                  <i className="fa-solid fa-cart-shopping mx-1 fs-5 position-relative">
                    {cartCount > 0 && (
                      <span className="position-absolute bottom-100 start-50 bg-main w-100 rounded-circle shoppcart text-light py-1 text-center mb-1">
                        {cartCount}
                      </span>
                    )}
                  </i>
                </Link>
              )}
              <i className="fab mx-2 fa-facebook"></i>
              <i className="fab mx-2 fa-twitter"></i>
              <i className="fab mx-2 fa-instagram"></i>
              <i className="fab mx-2 fa-youtube"></i>
              <i className="fab mx-2 fa-tiktok"></i>
            </li>

            {userIsLoggedIn ? (
              <li className="nav-item">
                <button onClick={logOut} className="nav-link btn btn-link">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
