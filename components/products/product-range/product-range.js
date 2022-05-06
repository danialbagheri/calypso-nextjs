import React from "react";

import ProductRangeItem from "./ProductRangeItem";

export default function ProductRange(props) {
  let product;

  if (props.products.length >= 1) {
    product = props.products.slice(0, props.limit).map((product) => {
      return <ProductRangeItem product={product} key={product.id} />;
    });
  } else {
    product = <p>Loading...</p>;
  }
  return <div className="row">{product}</div>;
}
