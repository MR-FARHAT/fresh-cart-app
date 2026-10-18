import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../api";
import Spinner from "./Spinner";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getOrders() {
      try {
        const { id } = jwtDecode(localStorage.getItem("token"));
        const { data } = await api.get(`/orders/user/${id}`);
        setOrders(data);
      } catch {
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    }

    getOrders();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <h1 className="mt-4">Your Orders</h1>
      {orders.length === 0 && <p className="alert alert-warning mt-3">You haven't placed any orders yet.</p>}
      {orders.map((order) => (
        <div key={order.id} className="order shadow rounded p-4 my-2">
          <div className="d-flex align-items-center">
            <h2 className="fw-bolder h1">#{order.id}</h2>
            <h4 className="fw-bold text-primary mx-4">{order.isDelivered ? "Delivered" : "Processing"}</h4>
          </div>
          <p>You ordered {order.cartItems.length} items.</p>
          <div className="d-flex flex-wrap gap-2">
            {order.cartItems.map((item) => (
              <img key={item._id} style={{ width: 150 }} src={item.product.imageCover} alt={item.product.title} />
            ))}
          </div>
          <hr />
          <p className="mb-0">
            <strong>Total Amount:</strong> {order.totalOrderPrice} EGP
          </p>
        </div>
      ))}
    </>
  );
}
