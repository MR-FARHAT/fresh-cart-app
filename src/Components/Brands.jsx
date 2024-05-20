import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  async function getAllBrands() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    setBrands(data.data);
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className="row mt-4">
      {brands.map((brand) => {
        return (
          <div className="col-md-3">
            <div className="brandCard">
              <img src={brand.image} className="w-100 img-thumbnail" alt="" />
              <h5 className="text-center fw-bold"> {brand.name} </h5>
            </div>
          </div>
        );
      })}
    </div>
  );
}



