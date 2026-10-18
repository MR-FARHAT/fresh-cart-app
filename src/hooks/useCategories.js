import { useQuery } from "react-query";
import { api } from "../api";

function fetchCategories() {
  return api.get("/categories").then(({ data }) => data.data);
}

export default function useCategories() {
  return useQuery("categories", fetchCategories);
}
