import { useEffect, useState } from "react";
import { api, getErrorMessage, notify } from "../api";
import WishListProduct from "./WishListProduct";
import Spinner from "./Spinner";

export default function WishList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getWishList() {
      try {
        const { data } = await api.get("/wishlist");
        setProducts(data.data ?? []);
      } catch {
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }

    getWishList();
  }, []);

  async function removeProductFromWishList(productId) {
    try {
      await api.delete(`/wishlist/${productId}`);
      setProducts((current) => current.filter((product) => product._id !== productId));
      notify("Product removed from your wish list");
    } catch (error) {
      notify(getErrorMessage(error));
    }
  }

  if (isLoading) return <Spinner />;

  if (products.length === 0) {
    return <h2 className="alert alert-warning text-center my-5">No products in your Wish List</h2>;
  }

  return (
    <div className="my-5">
      {products.map((product) => (
        <WishListProduct
          key={product._id}
          product={product}
          removeProductFromWishList={removeProductFromWishList}
        />
      ))}
    </div>
  );
}
