import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { api } from "../api";
import { cartContext } from "../Contexts/CartContext";
import Spinner from "./Spinner";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(cartContext);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function getProductDetails() {
      setIsLoading(true);
      setHasError(false);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data.data);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getProductDetails();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (hasError || !product) return <p className="alert alert-danger my-5">Couldn't load this product.</p>;

  return (
    <div className="row align-items-center py-5">
      <div className="col-md-3">
        <Slider {...sliderSettings}>
          {product.images?.map((img) => (
            <img src={img} key={img} className="w-100" alt={product.title} />
          ))}
        </Slider>
      </div>

      <div className="col-md-9">
        <h2 className="mt-2">{product.title}</h2>
        <h5 className="font-sm text-main mt-2">{product.category?.name}</h5>
        <p className="mt-2">{product.description}</p>
        <p className="d-flex justify-content-between mt-2">
          <span>{product.price} EGP</span>
          <span>
            <i className="fas fa-star rating-color me-1"></i>
            {product.ratingsAverage}
          </span>
        </p>
        <button onClick={() => addToCart(product.id)} className="btn bg-main text-white w-100 mt-2">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
