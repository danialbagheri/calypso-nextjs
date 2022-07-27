import React from "react";
import ReviewClass from "./Review.module.css";

export default function BasicProductInfo(props) {
  const product = props.product;
  return (
    <div className={ReviewClass.BasicProductInfoContainer}>
      <h1 className={ReviewClass.BasicProductInfoContainerTitle}>
        Your {product.name} review
      </h1>
      <div className={ReviewClass.BasicProductInfoImageContainer}>
        <img src={product.main_image} alt={product.name} />
      </div>
    </div>
  );
}
