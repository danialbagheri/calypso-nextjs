import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import data from "../../data.json";

export default function HomeSlider({ slides, isLoaded }) {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    // slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "dot",
  };
  const slider = isLoaded
    ? slides[0].slider_slides.map((slide) => {
        if (slide.slide.custom_slide) {
          return (
            <div className="banner" index={slide.slide.id}>
              {slide.slide.custom_code}
            </div>
          );
        } else {
          return (
            <div className="banner" index={slide.id}>
              <a href={slide.slide.link}>
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
                    srcset={slide.mobile_webp}
                    type="image/webp"
                  />
                  <img
                    src={slide.slide.desktop_image}
                    alt={slide.slide.image_alt_text}
                    className="hero-image"
                  />
                </picture>
              </a>
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
