import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import SubCategories from "./SubCategories";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);

  async function getAllCategory() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    console.log(data.data[0]._id);
    setCategories(data.data);
  }

  useEffect(() => {
    getAllCategory();
  },[]);
  return (
    <div className="row mt-5">
      {categories.map((category, index) => {
        return (
          <div className="col-md-3" key={index}>
            <SubCategories category={category} />
          </div>
        );
      })}
    </div>
  );
}
