import { useState, useEffect } from "react";
import _ from "lodash";
import StarRatingCustom from "../../common/star-rating-custom";
import Link from "next/link";
import Styles from "../../../styles/bestseller.module.css";
import AddToBasketWithDropDown from "../../products/detail/add-to-basket-with-dropdown";

export default function BestSellerItems(props) {
  const i = props.item.item;
  const [showButton, setShowButton] = useState(false);
  const [activeVariant, setActiveVariant] = useState(i.variants[0]);
  const showBox = () => setShowButton(!showButton);

  return (
    <div
      key={i.id}
      onMouseEnter={showBox}
      onMouseLeave={showBox}
      className={Styles.collectionItem}
    >
      <Link href={`/products/${i.slug}`}>
        <a>
          <div className={Styles.starRating}>
            <StarRatingCustom
              name={i.name}
              value={i.review_average_score}
              className="trending-box-star"
              halfStarSize="17px"
            />
          </div>
          {showButton ? (
            <div className={Styles.lifeStylePicture}>
              <picture>
                <img src={i.secondary_image_resized} alt={i.name} />
              </picture>
            </div>
          ) : (
            <div className={Styles.itemPicture}>
              <picture>
                <img src={i.main_image_resized} alt={i.name} />
              </picture>
            </div>
          )}
        </a>
      </Link>
      <div className={Styles.itemBody}>
        <h6 className={Styles.subTitle}>{i.name}</h6>
        <p className={Styles.subTitle}>
          {i.sub_title} {i.variants[0].name}
        </p>
        <p className={Styles.subTitle}>
          <strong>£{activeVariant.price}</strong>
        </p>
        <div className={Styles.buttonContainer}>
          <AddToBasketWithDropDown
            product={i}
            activeVariant={activeVariant}
            setActiveVariant={setActiveVariant}
            customContainerStyle={Styles.addToBasketWithDropDown}
          />
        </div>
      </div>
    </div>
  );
}
