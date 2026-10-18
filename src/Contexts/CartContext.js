import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { api, getErrorMessage, notify } from "../api";
import { authContext } from "./AuthContext";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const { userIsLoggedIn, isDemo } = useContext(authContext);
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = useCallback(async () => {
    try {
      const { data } = await api.get("/cart");
      setCartCount(data.numOfCartItems ?? 0);
    } catch {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    if (userIsLoggedIn && !isDemo) {
      refreshCartCount();
    } else {
      setCartCount(0);
    }
  }, [userIsLoggedIn, isDemo, refreshCartCount]);

  function demoBlocked() {
    if (isDemo) {
      notify("Demo mode: create a free account to use the cart and wish list.", "light");
    }
    return isDemo;
  }

  async function addToCart(productId) {
    if (demoBlocked()) return;
    try {
      const { data } = await api.post("/cart", { productId });
      setCartCount(data.numOfCartItems ?? 0);
      notify(data.message);
    } catch (error) {
      notify(getErrorMessage(error, "Couldn't add the product to your cart."));
    }
  }

  async function addToWishList(productId) {
    if (demoBlocked()) return;
    try {
      const { data } = await api.post("/wishlist", { productId });
      notify(`❤️ ${data.message}`, "light");
    } catch (error) {
      notify(getErrorMessage(error, "Couldn't add the product to your wish list."));
    }
  }

  return (
    <cartContext.Provider value={{ cartCount, setCartCount, refreshCartCount, addToCart, addToWishList }}>
      {children}
    </cartContext.Provider>
  );
}
