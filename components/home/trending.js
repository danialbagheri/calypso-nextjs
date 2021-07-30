import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "react-loaders";
import "loaders.css/loaders.min.css";
import data from "../../data.json";
import ProductSquareThumbnail from "../products/product-square-thumbnail";

class Trending extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      topSeller: [],
      error: null,
    };
  }
  componentDidMount() {
    this.fetchTopSellers();
  }
  fetchTopSellers() {
    const windowWidth = window.innerWidth;
    let thumbnailWidth;
    if (windowWidth > 1900) {
      thumbnailWidth = 550;
    } else if (windowWidth > 1400) {
      thumbnailWidth = 445;
    } else if (windowWidth > 720) {
      thumbnailWidth = 300;
    } else if (windowWidth > 460) {
      thumbnailWidth = 340;
    } else {
      thumbnailWidth = 210;
    }
    const baseUrl = data.apiUrl;
    const finalUrl =
      baseUrl + `products/collections/trending?resize_w=${thumbnailWidth}`;
    fetch(finalUrl)
      .then(function (response) {
        return response.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            topSeller: result.items,
          });
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error,
          });
        }
      );
  }
  render() {
    const { isLoaded, topSeller } = this.state;
    const settings = {
      slidesToShow: 4,
      arrows: true,
      dots: false,
      slidesToScroll: 1,
      infinite: false,
      responsive: [
        {
          breakpoint: 1236,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 780,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 460,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    let trendingItems;
    if (isLoaded >= 1) {
      trendingItems = topSeller.map((each, index) => {
        return (
          <div className="mr-3" key={index}>
            <ProductSquareThumbnail
              name={each.item.name}
              secondTitle={each.item.sub_title}
              slug={each.item.slug}
              image={each.item.main_image_resized}
              webp={each.item.main_image_webp}
              minPrice={each.item.lowest_variant_price}
              AverageReviewScore={each.item.review_average_score}
              variants={each.item.variants}
            />
          </div>
        );
      });
    }

    const trendingProducts = isLoaded ? (
      <Slider {...settings}>{trendingItems}</Slider>
    ) : (
      <Loader
        type="ball-pulse"
        active={true}
        color="orange"
        size="Large"
        className="p-2 general-loader"
      />
    );
    return (
      <div className="trending-slider">
        <h1>Trending</h1>
        {trendingProducts}
      </div>
    );
  }
}

export default Trending;
