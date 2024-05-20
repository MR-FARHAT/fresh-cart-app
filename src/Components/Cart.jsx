import axios from "axios";
import React, { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";


import { getProducts } from "../Redux/productsSlice";

export default function Cart() {

  let dispatch = useDispatch();
  let { products } = useSelector((state) => state.products)
  console.log(products)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const [timeOutId, setTimeOutId] = useState();

  const [cart, setCart] = useState({});
  const [cartId, setCartId] = useState()
  async function getLoggedInCartProduct() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCartId(data.data._id);
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function removeProductFromCart(productId) {
    const { data } = await axios.delete(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
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
    setCart(data);
  }

  function clearCart() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-success"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(
          "https://ecommerce.routemisr.com/api/v1/cart",
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        setCart(data);

        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your cart has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your cart is safe :)",
          icon: "error"
        });
      }
    });

  }
  function updateCartProductCount(productId, count) {
    clearTimeout(timeOutId);
    setTimeOutId(
      setTimeout(async () => {
        if (count == 0) {
          removeProductFromCart(productId);
        } else {
          const { data } = await axios.put(
            "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
            {
              count,
            },
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            }
          );
          setCart(data);
        }
      }, 3000)
    );
  }

  useEffect(() => {
    getLoggedInCartProduct();
  });

  return (
    <>




      {cart.data?.products.length > 0 ? (
        <div className="my-5">
          <button
            onClick={clearCart}
            className="btn btn-outline-danger d-block ms-auto"
          >
            Clear Cart
          </button>

          {cart.data?.products.map((cartProduct, index) => {
            return (
              <CartProduct
                key={index}
                cartProduct={cartProduct}
                removeProductFromCart={removeProductFromCart}
                updateCartProductCount={updateCartProductCount}
              />
            );
          })}

          <div className="d-flex justify-content-between">
            <Link to={'/address/' + cartId} className="btn bg-main text-white">CheckOut</Link>
            <p>Total cart Price: {cart.data?.totalCartPrice} EGP</p>
          </div>
        </div>
      ) : (
        <h2 className="alert alert-warning text-center my-5">
          No products in your cart
        </h2>
      )}
    </>
  );
}
