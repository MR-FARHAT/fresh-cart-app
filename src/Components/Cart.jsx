import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { api, getErrorMessage, notify } from "../api";
import { cartContext } from "../Contexts/CartContext";
import CartProduct from "./CartProduct";
import Spinner from "./Spinner";

const confirmDialog = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger",
    cancelButton: "btn btn-success",
  },
  buttonsStyling: false,
});

export default function Cart() {
  const { setCartCount } = useContext(cartContext);
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const updateTimeout = useRef();

  const applyCart = useCallback(
    (data) => {
      setCart(data);
      setCartCount(data?.numOfCartItems ?? 0);
    },
    [setCartCount]
  );

  useEffect(() => {
    async function getCart() {
      try {
        const { data } = await api.get("/cart");
        applyCart(data);
      } catch {
        applyCart(null);
      } finally {
        setIsLoading(false);
      }
    }

    getCart();
    return () => clearTimeout(updateTimeout.current);
  }, [applyCart]);

  async function removeProductFromCart(productId) {
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      applyCart(data);
      notify("Product removed from your cart");
    } catch (error) {
      notify(getErrorMessage(error));
    }
  }

  function updateCartProductCount(productId, count) {
    clearTimeout(updateTimeout.current);
    updateTimeout.current = setTimeout(async () => {
      if (count < 1) {
        removeProductFromCart(productId);
        return;
      }
      try {
        const { data } = await api.put(`/cart/${productId}`, { count });
        applyCart(data);
      } catch (error) {
        notify(getErrorMessage(error));
      }
    }, 800);
  }

  async function clearCart() {
    const result = await confirmDialog.fire({
      title: "Are you sure?",
      text: "This will remove every product from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete("/cart");
      applyCart(null);
      confirmDialog.fire({ title: "Cleared", text: "Your cart is empty now.", icon: "success" });
    } catch (error) {
      notify(getErrorMessage(error));
    }
  }

  if (isLoading) return <Spinner />;

  const products = cart?.data?.products ?? [];

  if (products.length === 0) {
    return <h2 className="alert alert-warning text-center my-5">No products in your cart</h2>;
  }

  return (
    <div className="my-5">
      <button onClick={clearCart} className="btn btn-outline-danger d-block ms-auto">
        Clear Cart
      </button>

      {products.map((cartProduct) => (
        <CartProduct
          key={cartProduct.product._id}
          cartProduct={cartProduct}
          removeProductFromCart={removeProductFromCart}
          updateCartProductCount={updateCartProductCount}
        />
      ))}

      <div className="d-flex justify-content-between align-items-center">
        <Link to={`/address/${cart.data._id}`} className="btn bg-main text-white">
          Checkout
        </Link>
        <p className="mb-0">
          <span className="fw-bolder">Total:</span> {cart.data.totalCartPrice} EGP
        </p>
      </div>
    </div>
  );
}
