import React, { useState, useEffect } from "react";
import ShareButton from "../common/shareButton";
import { useShopify } from "../hooks";
import StarRatingCustom from "../common/star-rating-custom";
import * as ga from "../common/googleAnalytics";
import ProductQuantity from "./detail/product-quantity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import DispatchTime from "./detail/dispatch-time";

export default function ProductDescription(props) {
  const { addVariant, checkoutState, openCart } = useShopify();
  const [dropdown, setDropDown] = useState(false);
  const [inStock, setStockStatus] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  // const [price, setPrice] = useState(props.price);
  useEffect(() => {
    if (props.shopifyState) {
      setStockStatus(props.shopifyState.availableForSale);
    }
  }, [props.shopifyState]);

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
    ga.event({
      action: "add_to_cart",
      params: [
        {
          product: props.productName,
          item: [
            {
              id: props.sku,
              name: props.productName,
              price: props.price,
              brand: "Calypso",
              variant: props.child,
            },
          ],
        },
      ],
    });
    setSelectedQuantity(1);
  }

  const DirectionOfUseText = {
    display: dropdown ? "block" : "none",
    padding: 0,
  };
  return (
    <div className="productDescription">
      <h1 className="productTitle" itemProp="name">
        {props.productName}
      </h1>
      <h3 className="productPrice">{props.secondTitle}</h3>
      <div className="review-count-product-description">
        <div className="star-rating">
          <StarRatingCustom
            name={props.productName}
            // className="star-rating"
            value={props.averageReviewScore}
            halfStarSize={"2rem"}
          />
        </div>
        <a href="#readReviews" className="read-reviews">
          {props.reviewCount >= 1 ? (
            <span>Read {props.reviewCount} reviews</span>
          ) : (
            <span>Be the first to review to this product</span>
          )}
        </a>
      </div>
      <div
        className="text-lg mb-2"
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
      {inStock ? (
        <p className="text-sm">
          In stock - <DispatchTime />
        </p>
      ) : (
        <p className="text-danger">OUT OF STOCK</p>
      )}
      <h2 className="productPrice">
        <span itemProp="priceCurrency" content="GBP">
          £
        </span>
        <span>{props.price.toFixed(2)}</span>
      </h2>
      {props.pricePer100ml ? (
        <small>£{props.pricePer100ml} per 100ml</small>
      ) : null}

      <div className="deliveryInfo">
        <FontAwesomeIcon icon={faTruck} className="calypso-orange-text" />
        <div style={{ textAlign: "left" }}>
          Buy 2 or more products for <strong>Free UK Delivery</strong>
          <br />
          <span style={{ color: "grey" }}>Standard UK delivery £2</span>
        </div>
      </div>
      <div className="addToCartContainer">{props.child}</div>
      {inStock ? (
        <div className="addToCartContainer">
          <ProductQuantity
            selectedQuantity={selectedQuantity}
            setQuantity={setSelectedQuantity}
          />
          <button
            className="addToCart"
            onClick={() => {
              addToBasket(props.variantId, selectedQuantity);
            }}
          >
            ADD TO CART
          </button>
        </div>
      ) : null}
      <div className="ShareButtonOnProductPage">
        <ShareButton />
      </div>
    </div>
  );
}
