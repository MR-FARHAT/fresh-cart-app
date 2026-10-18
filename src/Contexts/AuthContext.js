import { createContext, useState } from "react";

export const DEMO_ACCOUNT = {
  email: "demo@freshcart.app",
  password: "Demo@2026",
};

export const authContext = createContext();

export function isDemoLogin({ email, password }) {
  return email.trim().toLowerCase() === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password;
}

export default function AuthContextProvider({ children }) {
  const [isDemo, setIsDemo] = useState(localStorage.getItem("demo") === "true");
  const [hasToken, setHasToken] = useState(!!localStorage.getItem("token"));

  const userIsLoggedIn = hasToken || isDemo;

  function setUserIsLoggedIn(loggedIn) {
    setHasToken(loggedIn && !!localStorage.getItem("token"));
    if (!loggedIn) {
      localStorage.removeItem("demo");
      setIsDemo(false);
    }
  }

  function startDemo() {
    localStorage.removeItem("token");
    localStorage.setItem("demo", "true");
    setHasToken(false);
    setIsDemo(true);
  }

  return (
    <authContext.Provider value={{ userIsLoggedIn, setUserIsLoggedIn, isDemo, startDemo }}>
      {children}
    </authContext.Provider>
  );
}
