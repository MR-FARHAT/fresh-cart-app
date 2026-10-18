import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../Contexts/CartContext";

export default function Products({ product }) {
  const { addToCart, addToWishList } = useContext(cartContext);
  const shortTitle = product.title.split(" ").slice(0, 2).join(" ");

  return (
    <div className="product px-2 py-2 cursor-pointer">
      <Link to={`/productDetails/${product.id}`} className="text-decoration-none">
        <img src={product.imageCover} className="w-100" alt={product.title} />
        <h5 className="font-sm text-danger">{product.category.name}</h5>
        <h4>{shortTitle}</h4>
        <p className="d-flex justify-content-between">
          <span>{product.price} EGP</span>
          <span>
            <i className="fas fa-star rating-color me-1"></i>
            {product.ratingsAverage}
          </span>
        </p>
      </Link>

      <button onClick={() => addToCart(product.id)} className="btn bg-main w-100 text-white">
        + Add To Cart
      </button>
      <button onClick={() => addToWishList(product.id)} className="btn bg-danger w-100 mt-1 text-white">
        + Add To Wish List
      </button>
    </div>
  );
}
