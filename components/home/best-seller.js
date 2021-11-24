import { useState, useEffect } from "react";
import Styles from "../../styles/bestseller.module.css";
import data from "../../data.json";
import { useShopify } from "../hooks";
import StarRatingCustom from "../common/star-rating-custom";
import Link from "next/link";
export default function BestSeller(props) {
  const collection = props.bestseller;
  const [showButton, setShowButton] = useState(false);
  const { addVariant, checkoutState, openCart } = useShopify();

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

  const showBox = () => setShowButton(true);

  const collectionItems = collection.items.slice(0, 6).map((item) => {
    const i = item.item;
    return (
      <div
        index={i.id}
        onMouseEnter={showBox}
        className={Styles.collectionItem}
      >
        <Link href={`/products/${i.slug}`}>
          <a>
            <div className={Styles.starRating}>
              <StarRatingCustom
                name={i.name}
                value={i.review_average_score}
                className="trending-box-star"
              />
            </div>
            <div className={Styles.itemPicture}>
              <picture>
                <img
                  src={i.main_image_resized}
                  alt={i.name}
                  // objectFit="container"
                />
              </picture>
            </div>
            <div className={Styles.itemBody}>
              <h6 className={Styles.subTitle}>{i.name}</h6>
              <p className={Styles.subTitle}>
                {i.sub_title} = {i.variants[0].name}
              </p>
              <p className={Styles.subTitle}>
                <strong>£{i.variants[0].price}</strong>
              </p>
              <div className={Styles.buttonContainer}>
                <button
                  className={showButton ? Styles.addToBasket : Styles.Hide}
                  id={`button-${i.id}`}
                  onClick={() => {
                    addToBasket(i.variants[0].shopify_storefront_variant_id, 1);
                  }}
                >
                  Add to Basket
                </button>
              </div>
            </div>
          </a>
        </Link>
      </div>
    );
  });
  const collectionHTML = (
    <div>
      {collection ? (
        <div className={Styles.Container}>
          <div>
            <source srcset={collection.webp} type="image/webp" />
            <source srcset={collection.resized} media="(max-width: 600px)" />
            <img src={collection.image} alt="Calypso Best Seller products" />
          </div>
          <div className={Styles.productContainer}>{collectionItems}</div>
        </div>
      ) : null}
    </div>
  );
  return (
    <div>
      <h1 className="textCenter">Top Seller products</h1>
      {collectionHTML}
    </div>
  );
}
