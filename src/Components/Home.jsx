import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { getProducts } from "../Redux/productsSlice";
import Products from "./Products";
import CategorySlider from "./CategorySlider";
import Spinner from "./Spinner";
import image1 from "../Assets/1.jpg";
import image2 from "../Assets/2.jpg";
import image3 from "../Assets/grocery-banner.png";
import image4 from "../Assets/grocery-banner-2.jpeg";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
};

export default function Home() {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  return (
    <>
      <div className="row g-0 mt-4">
        <div className="col-md-10">
          <Slider {...sliderSettings}>
            <img src={image3} className="w-100" alt="Fresh groceries" />
            <img src={image4} className="w-100" alt="Grocery deals" />
          </Slider>
        </div>
        <div className="col-md-2">
          <img src={image1} className="w-100" alt="Fresh fruit" />
          <img src={image2} className="w-100" alt="Fresh vegetables" />
        </div>
      </div>

      <CategorySlider />

      {isLoading && <Spinner />}
      {error && <p className="alert alert-danger mt-4">Couldn't load products. Please refresh the page.</p>}

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3">
            <Products product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
