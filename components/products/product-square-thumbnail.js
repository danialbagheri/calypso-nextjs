import React from "react";
// import StarRatingComponent from "react-star-rating-component";
import Link from "next/link";
import Image from "next/image";
import StarRatingCustom from "../common/star-rating-custom";

export default class ProductSquareThumbnail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageList: [],
      error: null,
      hover: false,
    };
    this.toggleHover = this.toggleHover.bind(this);
  }
  toggleHover() {
    this.setState({ hover: !this.state.hover });
  }

  render() {
    const { variants, product } = this.props;
    return (
      <div className="trending-item-parent">
        <Link href={`/products/${product.slug}`}>
          <a className="trending-box-image" onMouseEnter={this.toggleHover}>
            <Image
              src={product.main_image || "/advice/placeholder.png"}
              alt={product.name}
              className={this.state.hover ? "d-none" : "d-block"}
              layout="fill"
              objectFit="contain"
            />
            <Image
              src={product.secondary_image || "/advice/placeholder.png"}
              alt={product.name}
              className={this.state.hover ? "d-block" : "d-none"}
              layout="fill"
              objectFit="contain"
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
            />
            <text>{product.review_average_score}</text>
          </div>
        </div>
      </div>
    );
  }
}
