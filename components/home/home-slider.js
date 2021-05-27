import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import Image from "next/image";
import Link from "next/link";
export default function HomeSlider({ slides, isLoaded }) {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: "progressive",
    // slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "dot",
  };
  const slider = isLoaded
    ? slides[0].slider_slides.map((slide) => {
        if (slide.slide.custom_slide) {
          return (
            <div className="banner" index={slide.slide.id} key={slide.slide.id}>
              <div
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: slide.slide.custom_code }}
              />
            </div>
          );
        } else {
          return (
            <div className="banner" index={slide.id} key={slide.id}>
              <Link href={slide.slide.link ? slide.slide.link : "/about"}>
                <picture>
                  <source
                    media="(min-width: 641px)"
                    srcSet={slide.desktop_webp}
                    type="image/webp"
                  />
                  <source
                    media="(min-width: 641px)"
                    srcSet={slide.desktop_resized}
                    type="image/png"
                  />
                  <source
                    media="(max-width: 640px)"
                    srcset={slide.slide.mobile_image}
                    type="image/png"
                  />
                  <source
                    media="(max-width: 640px)"
                    srcSet={slide.mobile_webp}
                    type="image/webp"
                  />
                  <img
                    src={slide.slide.desktop_image}
                    alt={slide.slide.image_alt_text}
                    className="hero-image"
                  />
                </picture>
              </Link>
            </div>
          );
        }
      })
    : null;
  const loadedSlide = isLoaded ? (
    <div>
      <Slider {...settings}>{slider}</Slider>
    </div>
  ) : (
    <div className="p-2 slider-loader" />
  );
  return <div>{loadedSlide}</div>;
}
