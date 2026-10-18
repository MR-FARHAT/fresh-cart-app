import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.token = token;
  }
  return config;
});

export function getErrorMessage(error, fallback = "Something went wrong, please try again.") {
  return error?.response?.data?.message || fallback;
}

export function notify(message, theme = "dark") {
  toast(message, {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: false,
    theme,
  });
}
