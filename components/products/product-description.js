import React, { useState, useEffect } from "react";
import ShareButton from "../common/shareButton";
import StarRatingComponent from "react-star-rating-component";
import { useShopify } from "../hooks";

export default function ProductDescription(props) {
  const [dropdown, setDropDown] = useState(false);
  const { addVariant, checkoutState, openCart } = useShopify();
  const openDropDown = (e) => {
    e.preventDefault();
    setDropDown(!dropdown);
  };
  function addToBasket(variantId, quantity) {
    const lineItemsToAdd = [
      {
        variantId: variantId,
        quantity: parseInt(quantity, 10),
      },
    ];
    console.log(checkoutState.id);
    addVariant(checkoutState.id, lineItemsToAdd);
    openCart();
  }

  const DirectionOfUseText = {
    display: dropdown ? "block" : "none",
    padding: 0,
  };
  return (
    <div
      className="productDescription"
      itemScope
      itemType="http://schema.org/Product"
    >
      <h1 className="productTitle" itemProp="name">
        {props.productName}
      </h1>
      <h3 className="productPrice">{props.secondTitle}</h3>
      <div className="review-count-product-description">
        <StarRatingComponent
          name={props.productName}
          starColor={"#fc6b21"}
          editing={false}
          starCount={5}
          emptyStarColor={"#d2d2d2"}
          className="star-rating"
          value={props.averageReviewScore}
        />
        <a href="#readReviews" className="read-reviews">
          {props.reviewCount >= 1
            ? `Read ${props.reviewCount} reviews`
            : "Be the first to review to this product"}
        </a>
      </div>
      <div
        className="text-lg mb-2"
        itemProp="description"
        dangerouslySetInnerHTML={{
          __html: props.description,
        }}
      />
      <button className="DirectionOfUse" onClick={(e) => openDropDown(e)}>
        Directions for Use
      </button>
      <div
        style={DirectionOfUseText}
        dangerouslySetInnerHTML={{
          __html: props.direction,
        }}
      />
      <div className="borderBottom" />
      <div className="top20" />
      <h2 className="productPrice">
        <span itemProp="priceCurrency" content="GBP">
          £
        </span>
        <span itemProp="price" content={props.price}>
          {props.price}
        </span>
      </h2>
      <div className="addToCartContainer">{props.child}</div>
      <button
        className="addToCart"
        onClick={() => {
          addToBasket(props.variantId, 1);
        }}
      >
        ADD TO CART
      </button>
      <div className="ShareButtonOnProductPage">
        <ShareButton />
      </div>
    </div>
  );
}
