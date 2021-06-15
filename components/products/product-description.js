import React, { useState, useEffect } from "react";
import ShareButton from "../common/shareButton";
import StarRatingComponent from "react-star-rating-component";
import { useShopify } from "../hooks";
import StarRatingCustom from "../common/star-rating-custom";
export default function ProductDescription(props) {
  const { addVariant, checkoutState, openCart } = useShopify();
  const [dropdown, setDropDown] = useState(false);
  const [inStock, setStockStatus] = useState(true);
  const [price, setPrice] = useState(props.price);
  useEffect(() => {
    if (props.shopifyState) {
      setStockStatus(props.shopifyState.availableForSale);
      if (props.shopifyState.availableForSale) {
        setPrice(props.shopifyState.variants[0].price);
      }
    }
  }, props.shopifyState);

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
        <StarRatingCustom
          name={props.productName}
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
      {inStock ? <p>In stock</p> : <p className="text-danger">OUT OF STOCK</p>}
      <h2 className="productPrice">
        <span itemProp="priceCurrency" content="GBP">
          £
        </span>
        <span itemProp="price" content={price}>
          {price}
        </span>
      </h2>
      <div className="addToCartContainer">{props.child}</div>
      {inStock ? (
        <button
          className="addToCart"
          onClick={() => {
            addToBasket(props.variantId, 1);
          }}
        >
          ADD TO CART
        </button>
      ) : null}
      <div className="ShareButtonOnProductPage">
        <ShareButton />
      </div>
    </div>
  );
}
