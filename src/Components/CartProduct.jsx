import { useEffect, useState } from "react";

export default function CartProduct({ cartProduct, removeProductFromCart, updateCartProductCount }) {
  const { product, price } = cartProduct;
  const [count, setCount] = useState(cartProduct.count);

  useEffect(() => {
    setCount(cartProduct.count);
  }, [cartProduct.count]);

  function changeCount(newCount) {
    setCount(newCount);
    updateCartProductCount(product._id, newCount);
  }

  return (
    <div className="cart-product shadow rounded-2 my-3">
      <div className="row align-items-center">
        <div className="col-md-2">
          <img className="w-100" src={product.imageCover} alt={product.title} />
        </div>
        <div className="col-md-8">
          <h2>{product.title}</h2>
          <h5>{product.category.name}</h5>
          <p className="d-flex justify-content-between">
            <span>{price} EGP</span>
            <span>
              <i className="fas fa-star rating-color me-1"></i>
              {product.ratingsAverage}
            </span>
          </p>
          <p>
            <span className="fw-bolder">Total Price:</span> {price * count} EGP
          </p>
        </div>
        <div className="col-md-2">
          <button onClick={() => removeProductFromCart(product._id)} className="btn text-danger">
            Remove
          </button>
          <div className="d-flex align-items-center">
            <button onClick={() => changeCount(count - 1)} className="btn bg-main text-white mx-2">
              -
            </button>
            <span>{count}</span>
            <button onClick={() => changeCount(count + 1)} className="btn bg-main text-white mx-2">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
