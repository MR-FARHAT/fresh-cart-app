import { useQuery } from "react-query";
import { api } from "../api";
import Products from "./Products";
import Spinner from "./Spinner";

function fetchProducts() {
  return api.get("/products").then(({ data }) => data.data);
}

export default function AllProducts() {
  const { data: products = [], isLoading, isError } = useQuery("products", fetchProducts, {
    cacheTime: 20000,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <p className="alert alert-danger mt-4">Couldn't load products. Please try again.</p>;

  return (
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-3">
          <Products product={product} />
        </div>
      ))}
    </div>
  );
}
