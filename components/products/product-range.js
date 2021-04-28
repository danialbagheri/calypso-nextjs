import React, { useState, useEffect } from "react";
import data from "../../data.json";
import Link from "next/link";
export default function ProductRange(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [childProducts, setChildProducts] = useState([]);
  const [variantId, setVariantId] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  useEffect(() => {
    if (props.products) {
      const p = props.products;
      setProducts(p);
      setIsLoaded(true);
      setChildProducts(p[0].variants);
      setVariantId(p[0].variants[0].shopify_variant_id);
    } else {
      fetchProducts();
    }
  }, []);

  function fetchProducts() {
    const baseUrl = data.apiUrl;
    const type = props.type;
    const finalUrl = baseUrl + `products/product/?type=${type}`;
    fetch(finalUrl)
      .then(function (response) {
        return response.json();
      })
      .then(
        (result) => {
          let jsonData = result.results;
          setIsLoaded(true);
          setProducts(jsonData);
          setChildProducts(jsonData[0].variants);
          setVariantId(jsonData[0].variants[0].shopify_variant_id);
        },
        (error) => {
          setIsLoaded(false);
        }
      );
  }
  function addToBasket(variantId, quantity) {
    const lineItemsToAdd = [{ variantId, quantity: parseInt(quantity, 10) }];
    const checkoutId = props.shopify.checkout.id;
    props.addVariantToCart(checkoutId, lineItemsToAdd);
  }
  let product;
  if (products.length >= 1) {
    product = products.map((product) => {
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
              <p className="textCenter productPageTitle">{product.name}</p>
              <p className="textCenter" style={{ marginTop: 3 }}>
                {product.second_title}
              </p>
            </a>
          </Link>
        </div>
      );
    });
  } else {
    product = <p>there was a problem</p>;
  }
  return <div className="row">{product}</div>;
}
