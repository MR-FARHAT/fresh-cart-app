import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const { id } = jwtDecode(localStorage.getItem("token"));
  const [allOrders, setAllOrders] = useState([]);

  async function getAllOrders() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/orders/user/" + id
    );
    setAllOrders(data);
  }

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <>
      <h1 className="mt-4">Your Orders</h1>
      {allOrders.map((order) => {
        return (
          <div key={order.id} className="row">
            <div className="order shadow rounded p-4 my-2">
              <div className="d-flex align-items-center ">
                <h2 className="fw-bolder h1"> #{order.id} </h2>
                <h4 className="fw-bold text-primary mx-4">Processing</h4>
              </div>
              <p>You Have Ordered {order.cartItems.length} items.</p>
              <div className="d-flex">
                {order.cartItems.map((item) => {
                  return (
                    <img
                      key={item._id}
                      style={{ width: 150 }}
                      src={item.product.imageCover}
                      alt=""
                    />
                  );
                })}
              </div>
              <hr />
              <p>
                <strong>Total Amount: </strong> {order.totalOrderPrice} EGP{" "}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
