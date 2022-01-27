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
    const {
      name,
      secondTitle,
      slug,
      image,
      minPrice,
      AverageReviewScore,
      variants,
      webp,
    } = this.props;
    let lifeStyleImage = null;

    // for (let i = 0; i < imageList.length; i++) {
    //   console.log(imageList[i]);
    // }
    variants.map((each) => {
      if (each["image_list"].find((el) => el.image_type === "LS")) {
        lifeStyleImage = each["image_list"].find(
          (el) => el.image_type === "LS"
        ).resized;
      }
    });
    if (!lifeStyleImage) {
      if (variants[variants.length - 1]["image_list"].length > 0) {
        lifeStyleImage = variants[variants.length - 1]["image_list"][0].resized;
      } else {
        lifeStyleImage = null;
      }
    }
    return (
      <div className="trending-item-parent">
        <Link href={`/products/${slug}`}>
          <a className="trending-box-image" onMouseEnter={this.toggleHover}>
            <Image
              src={image || "/advice/placeholder.png"}
              alt={name}
              className={this.state.hover ? "d-none" : "d-block"}
              layout="fill"
              objectFit="contain"
            />
            <Image
              src={lifeStyleImage || "/advice/placeholder.png"}
              alt={name}
              className={this.state.hover ? "d-block" : "d-none"}
              layout="fill"
              objectFit="contain"
            />
            {/* <div style={{ width: "280px", height: "400px" }}>

          </div> */}
          </a>
        </Link>
        <div className="trending-box-text">
          <p>
            <strong>{name}</strong>
            <br />
            {secondTitle}
          </p>
          <p className="trending-box-price">From £{minPrice}</p>

          <div className="trending-star-review-container">
            <StarRatingCustom
              name={name}
              value={AverageReviewScore}
              className="trending-box-star"
            />
            <text>{AverageReviewScore}</text>
          </div>
        </div>
      </div>
    );
  }
}
