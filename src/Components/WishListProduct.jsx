export default function WishListProduct({ product, removeProductFromWishList }) {
  return (
    <div className="cart-product shadow rounded-2 my-3">
      <div className="row align-items-center">
        <div className="col-md-2">
          <img className="w-100" src={product.imageCover} alt={product.title} />
        </div>
        <div className="col-md-8">
          <h2>{product.title}</h2>
          <h5>{product.category.name}</h5>
          <p className="d-flex justify-content-start">
            <span className="me-5">{product.price} EGP</span>
            <span>
              <i className="fas fa-star rating-color me-1"></i>
              {product.ratingsAverage}
            </span>
          </p>
        </div>
        <div className="col-md-2">
          <button onClick={() => removeProductFromWishList(product._id)} className="btn btn-outline-danger">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
