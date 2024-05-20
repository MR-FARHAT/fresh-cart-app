import React from 'react'
// import { Link } from 'react-router-dom'

export default function SubCategories({category}) {
  return (
    
            <div className="category">
              <img
                style={{ height: 300 }}
                src={category.image}
                className="w-100 img-thumbnail "
                alt=""
              />
              <h5 className="text-center fw-bold "> {category.name} </h5>
            </div>
            
  )
}
