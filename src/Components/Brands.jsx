import { useQuery } from "react-query";
import { api } from "../api";
import Spinner from "./Spinner";

function fetchBrands() {
  return api.get("/brands").then(({ data }) => data.data);
}

export default function Brands() {
  const { data: brands = [], isLoading } = useQuery("brands", fetchBrands);

  if (isLoading) return <Spinner />;

  return (
    <div className="row mt-4">
      {brands.map((brand) => (
        <div className="col-md-3" key={brand._id}>
          <div className="brandCard">
            <img src={brand.image} className="w-100 img-thumbnail" alt={brand.name} />
            <h5 className="text-center fw-bold">{brand.name}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}
