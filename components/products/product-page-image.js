import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function ProductPageImage(props) {
  const imageList = props.imageList;
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let slider1 = [];
  let slider2 = [];
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);
  let images = imageList.map((image, index) => {
    return (
      //   <div className="product-image-holder" key={index}>
      <Image
        className="thumbnail-holder"
        src={image.image}
        alt={image.alternate_text}
        layout="responsive"
        width={image.width}
        height={image.height}
        key={index}
      />
      //   </div>
    );
  });
  return (
    <div className="product-photo-holder">
      <Slider
        asNavFor={nav2}
        ref={(slider) => (slider1 = slider)}
        className="product-page-main-image top20"
      >
        {images}
      </Slider>

      <Slider
        className="product-image-thumbnail"
        asNavFor={nav1}
        ref={(slider) => (slider2 = slider)}
        slidesToShow={6}
        infinite={false}
        swipeToSlide={true}
        focusOnSelect={true}
        lazyLoad={true}
      >
        {images}
      </Slider>
    </div>
  );
}
