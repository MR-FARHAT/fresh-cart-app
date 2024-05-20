import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Products({ product }) {
  async function addProductToCart(productId) {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        productId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    toast(data.message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    console.log(product);
  }
  async function addProductToWishList(productId) {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        productId,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    toast("❤️ " + data.message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(product);
  }

  return (
    <div className="product px-2 py-2 cursor-pointer">
      <Link
        to={"/productDetails/" + product.id}
        className="a text-decoration-none"
      >
        <img src={product.imageCover} className="w-100" alt="" />
        <h5 className="font-sm text-danger">{product.category.name}</h5>
        <h4> {product.title.split(" ").slice(0, 2).join(" ")} </h4>
        <p className="d-flex justify-content-between ">
          <span> {product.price} EGP</span>
          <span>
            <i className="fas fa-star rating-color me-1 rating-color"></i>
            {product.ratingsAverage}
          </span>
        </p>
      </Link>

      <button
        onClick={() => addProductToCart(product.id)}
        className="btn bg-main w-100 text-white"
      >
        + Add To Cart
      </button>
      <button
        onClick={() => addProductToWishList(product.id)}
        className="btn bg-danger w-100 mt-1 text-white"
      >
        + Add To Wish List
      </button>
    </div>
  );
}
