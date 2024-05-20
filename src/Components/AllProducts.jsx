import axios from "axios";
import React from "react";
import Products from "./Products";
import { useQuery } from "react-query";


export default function AllProducts() {


  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products"); //Must use return 

  }
  //this steps to caching the data 
  const { data } = useQuery('products', getAllProducts, {
    cacheTime: 20000,
    // refetchInterval:10000, //data will refetch atfer x milliseconds
    // staleTime:5000 //Data will be fresh for x milliseconds
  }) // tan Stack or react query, 

  console.log(data)

  // in the browser we can FORCE clear the cache by "ctrl shift R"
  return (
    <>




      <div className="row">
        {data?.data.data.map((product) => {
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
