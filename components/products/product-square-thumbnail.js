import React from "react";
import StarRatingComponent from "react-star-rating-component";
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
        lifeStyleImage = each["image_list"].find((el) => el.image_type === "LS")
          .resized;
      }
    });
    if (!lifeStyleImage) {
      lifeStyleImage =
        variants[variants.length - 1]["image_list"][0]["resized"];
    }
    let hoveredImage;
    if (this.state.hover) {
      hoveredImage = {
        backgroundSize: "cover",
        backgroundImage: `url(${lifeStyleImage})`,
        backgroundPosition: "center center",
      };
    }
    return (
      <div className="trending-item-parent">
        <a
          href={`/products/${slug}`}
          className="trending-box-image"
          onMouseEnter={this.toggleHover}
          style={hoveredImage}
        >
          <picture className={this.state.hover ? "d-none" : "d-block"}>
            <source srcSet={webp} alt={name} type="image/webp" />
            <source srcSet={image} alt={name} type="image/png" />
            <img src={image} alt={name} />
          </picture>
        </a>
        <div className="trending-box-text">
          <p>
            <strong>{name}</strong>{" "}
          </p>
          <p className="trending-box-price">From £{minPrice}</p>
          <p>{secondTitle}</p>
          <StarRatingComponent
            starColor={"#fc6b21"}
            editing={false}
            starCount={5}
            name={"Score"}
            value={AverageReviewScore}
            className="trending-box-star"
          />
        </div>
      </div>
    );
  }
}
