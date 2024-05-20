import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: false,
  };
  const [categories, setCategories] = useState([]);
  async function getAllCategory() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <>
      <Slider {...settings} className="mt-4">
        {categories.map((category, index) => {
          return (
            <div key={index}>
              <img
                style={{ height: 200 }}
                src={category.image}
                className="w-100"
                alt=""
              />
              <h5 className="text-center mt-2"> {category.name} </h5>
            </div>
          );
        })}
      </Slider>
    </>
  );
}
