import React, { useState, useEffect } from "react";
import data from "../../data.json";
import Link from "next/link";
import StarRatingCustom from "../common/star-rating-custom";

export default function ProductRange(props) {
  const [isLoaded, setIsLoaded] = useState(false);

  const [pageCount, setPageCount] = useState([]);

  // function getAllPages(pageCount, url) {
  //   let pageNumber = 1;
  //   let productResult = [];
  //   for (pageNumber; pageNumber <= pageCount; pageNumber++) {
  //     let paginatedUrl = url + `&page=${pageNumber}`;
  //     fetch(paginatedUrl)
  //       .then((res) => res.json())
  //       .then((product) => productResult.push(product.results));
  //   }
  //   return productResult;
  // }
  // function fetchProducts() {
  //   const baseUrl = data.apiUrl;
  //   const type = props.type;
  //   const finalUrl = baseUrl + `products/product/?type=${type}`;
  //   fetch(finalUrl)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(
  //       (result) => {
  //         let jsonData = result.results;
  //         setPageCount(Math.ceil(jsonData.count / 10));
  //         setIsLoaded(true);
  //         setProducts(jsonData);
  //         // setChildProducts(jsonData[0].variants);
  //         // setVariantId(jsonData[0].variants[0].shopify_variant_id);
  //         if (result.next) {
  //           console.log("has next page!");
  //           let productResult = getAllPages(pageCount, finalUrl);
  //           setProducts(productResult.flat());
  //         }
  //       },
  //       (error) => {
  //         setIsLoaded(false);
  //       }
  //     );
  // }
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
