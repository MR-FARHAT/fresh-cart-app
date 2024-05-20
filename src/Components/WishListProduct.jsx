// import React, { useState } from 'react'

export default function WishListProduct({
  wishList,
  removeProductFromWishList,
}) {
  return (
    <div className="cart-product shadow rounded-2 my-3">
      <div className="row align-items-center">
        <div className="col-md-2">
          <img className="w-100" src={wishList.imageCover} alt="" />
        </div>
        <div className="col-md-8">
          <h2>{wishList.title}</h2>
          <h5>{wishList.category.name}</h5>
          <p className="d-flex justify-content-start">
            <span className="me-5">{wishList.price} EGP</span>
            <span>
              <i className=" fas fa-star rating-color me-1"></i>{" "}
              {wishList.ratingsAverage}
            </span>
          </p>
        </div>
        <div className="col-md-2">
          <button
            onClick={() => removeProductFromWishList(wishList._id)}
            className="btn btn-outline-danger "
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
