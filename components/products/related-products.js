import Styles from "../../styles/relatedProducts.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import StarRatingCustom from "../common/star-rating-custom";

export default function RelatedProducts({ related }) {
  const settings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    dotsClass: "dot",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const relatedProducts = related.map((product, index) => {
    return (
      <div key={index}>
        <a href={`/products/${encodeURIComponent(product.slug)}`}>
          <div className={Styles.productHolder}>
            <div className={Styles.ProductImage}>
              <picture>
                <source srcSet={product.webp} type="image/webp" />
                <source srcSet={product.resized} media="(max-width: 600px)" />
                <img
                  src={product.main_image}
                  height={product.img_height}
                  width={product.img_width}
                  alt={product.name}
                  loading="lazy"
                />
              </picture>
            </div>

            <div className={Styles.bottomText}>
              <StarRatingCustom
                value={product.review_average_score}
                name={product.name}
                className={Styles.starReview}
                halfStarSize={"1.2rem"}
              />
              <p>
                <strong>{product.name}</strong> <br />
                {product.sub_title}
              </p>
              <p>from ??{product.starting_price}</p>
            </div>
          </div>
        </a>
      </div>
    );
  });
  return (
    <div className="bg-secondary p-3">
      <h4 className="textCenter">You may also like</h4>
      <Slider {...settings}>{relatedProducts}</Slider>
    </div>
  );
}
