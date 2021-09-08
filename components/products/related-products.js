import Image from "next/image";
import Styles from "../../styles/sunready.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

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
        <Link href={`/products/${encodeURIComponent(product.slug)}`}>
          <a className="disableLink">
            <div className={Styles.productHolder}>
              <div>
                <Image
                  src={product.main_image}
                  height={product.img_height}
                  width={product.img_width}
                  alt={product.name}
                  layout="responsive"
                />
              </div>
              <div className="text-centre">
                <p>
                  <strong>{product.name}</strong> <br />
                  {product.sub_title}
                </p>
                <p>
                  <strong>from £{product.starting_price}</strong>
                </p>
              </div>
            </div>
          </a>
        </Link>
      </div>
    );
  });
  return (
    <div className="bg-secondary p-3">
      <h1 className="textCenter">Related Products</h1>
      <Slider {...settings}>{relatedProducts}</Slider>
    </div>
  );
}
