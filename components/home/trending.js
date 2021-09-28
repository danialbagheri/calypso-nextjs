import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "react-loaders";
import "loaders.css/loaders.min.css";
import ProductSquareThumbnail from "../products/product-square-thumbnail";

export default function Trending(props) {
  const isLoaded = true;
  const topSeller = props.trending;

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
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const trendingItems = topSeller.map((each, index) => {
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
