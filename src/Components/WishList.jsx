import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import WishListProduct from "./WishListProduct";

export default function WihList () {

  const [wishList, setWishList] = useState({});
  const [wishListId,setWishListId] = useState ()
  async function getLoggedInWishListtProduct() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log (data)
      setWishListId (data.data._id);
      setWishList(data);
    } catch (error) {
      
    }
  }
  async function removeProductFromWishList(productId) {
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    toast('Product has removed', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",

    })
    setWishListId(data);
  }

 
  

  useEffect(() => {
    getLoggedInWishListtProduct();
  });

  return (
    <>
      {wishList.data?.length > 0 ? (
        <div className="my-5">
          {wishList.data?.map((wishList, index) => {
            return (
              <WishListProduct
                key={index}
                wishList={wishList}
                removeProductFromWishList={removeProductFromWishList}
              />
            );
          })}
        </div>
      ) : (
        <h2 className="alert alert-warning text-center my-5">
          No products in your Wish List
        </h2>
      )}
    </>
  );
}
