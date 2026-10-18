import Slider from "react-slick";
import useCategories from "../hooks/useCategories";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 7,
  arrows: false,
  responsive: [
    { breakpoint: 992, settings: { slidesToShow: 4, slidesToScroll: 4 } },
    { breakpoint: 576, settings: { slidesToShow: 2, slidesToScroll: 2 } },
  ],
};

export default function CategorySlider() {
  const { data: categories = [] } = useCategories();

  return (
    <Slider {...sliderSettings} className="mt-4">
      {categories.map((category) => (
        <div key={category._id}>
          <img style={{ height: 200 }} src={category.image} className="w-100" alt={category.name} />
          <h5 className="text-center mt-2">{category.name}</h5>
        </div>
      ))}
    </Slider>
  );
}
