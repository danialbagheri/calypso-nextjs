import React, { useState, useEffect } from "react";
import Link from "next/link";
import StarRatingCustom from "../common/star-rating-custom";

export default function ProductRange(props) {
  function addToBasket(variantId, quantity) {
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];
    const checkoutId = props.shopify.checkout.id;
    props.addVariantToCart(checkoutId, lineItemsToAdd);
  }
  let product;

  if (props.products.length >= 1) {
    product = props.products.slice(0, props.limit).map((product) => {
      return (
        <div
          key={product.id}
          className="col-md-3 col-sm-6 col-xs-12 col-lg-3 col-6 productPageSingle"
        >
          <Link href={`/products/${product.slug}`}>
            <a>
              <div className="productPageImageHolder">
                {product.collection_names.length > 0 ? (
                  <div className="productBadge">
                    {product.collection_names[0]}
                  </div>
                ) : null}

                <img
                  className="ProductPageImage"
                  src={product.main_image}
                  alt={product.name}
                />
              </div>
              <div className="text-left-align">
                <p className="productPageTitle">{product.name}</p>
                <p className="mt-0 mb-0">
                  <small>{product.sub_title}</small>
                </p>
                <hr className="m-1" />
                <div className="mt-0 d-flex mb-2">
                  <div>
                    <small>From £{product.lowest_variant_price}</small>
                  </div>
                  <div className="product-range-star-rating-fix-width">
                    <StarRatingCustom
                      value={product.review_average_score}
                      name={product.name}
                      className="trending-box-star"
                    />
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>
      );
    });
  } else {
    product = <p>Loading...</p>;
  }
  return <div className="row">{product}</div>;
}
