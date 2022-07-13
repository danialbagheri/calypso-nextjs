import React from "react";
// import StarRatingComponent from "react-star-rating-component";
import Link from "next/link";
import Image from "next/image";
import StarRatingCustom from "../../common/star-rating-custom";

export default function TrendingItem(props) {
  const { product } = props;
  const [hover, setHover] = React.useState(false);

  const toggleHover = () => {
    setHover(!hover);
  };
  return (
    <div className="trending-item-parent">
      <Link href={`/products/${product.slug}`}>
        <a className="trending-box-image" onMouseEnter={toggleHover}>
          <Image
            src={product.main_image || "/advice/placeholder.png"}
            alt={product.name}
            className={hover ? "d-none" : "d-block"}
            layout="fill"
            objectFit="contain"
          />
          <Image
            src={product.secondary_image || "/advice/placeholder.png"}
            alt={product.name}
            className={hover ? "d-block" : "d-none"}
            layout="fill"
            objectFit="cover"
          />
        </a>
      </Link>
      <div className="trending-box-text">
        <p>
          <strong>{product.name}</strong>
          <br />
          {product.sub_title}
        </p>
        <p className="trending-box-price">
          From £{product.lowest_variant_price}
        </p>

        <div className="trending-star-review-container">
          <StarRatingCustom
            name={product.name}
            value={product.review_average_score}
            className="trending-box-star"
            halfStarSize="16px"
          />
          <text>{product.review_average_score}</text>
        </div>
      </div>
    </div>
  );
}
