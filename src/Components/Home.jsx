import axios from "axios";
import React, { useEffect, useState } from "react";
import Products from "./Products";
import Slider from "react-slick";
import image1 from "../Assets/1.jpg";
import image2 from "../Assets/2.jpg";
import image3 from "../Assets/grocery-banner.png";
import image4 from "../Assets/grocery-banner-2.jpeg";
import CategorySlider from "./CategorySlider";

export default function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const [products, setProducts] = useState([]);
  async function getAllProducts() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );

    setProducts(data.data);
    console.log(products._id);
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <div className="row g-0 mt-4">
        <div className="col-md-10">
          <Slider {...settings}>
            <div>
              <img src={image3} className="w-100" alt="" />
            </div>
            <div>
              <img src={image4} className="w-100" alt="" />
            </div>
          </Slider>
        </div>
        <div className="col-md-2">
          <img src={image1} className="w-100" alt="" />
          <img src={image2} className="w-100" alt="" />
        </div>
      </div>

      <CategorySlider />

      <div className="row">
        {products.map((product) => {
          return (
            <div key={product.id} className="col-md-3">
              <Products product={product} />
            </div>
          );
        })}
      </div>
    </>
  );
}
