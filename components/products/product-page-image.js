import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function ProductPageImage(props) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let slider1 = [];
  let slider2 = [];
  let imageList = props.imageList;

  function sortByImageType(a, b) {
    if (a.image_type === "PI") {
      return -1;
    }
    return 0;
  }
  // sorting the images by their type - Product Images first
  imageList.sort(sortByImageType);

  function searchForVariant(variantId, images) {
    for (var i = 0; i < images.length; i++) {
      if (images[i].variant === variantId) {
        return i;
      }
    }
  }
  // This hooks the thumbnails to product main slider
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  // when variant is changes, product image will also change
  useEffect(() => {
    let slideNumber = searchForVariant(props.selectedVariant.id, imageList);
    slider1.slickGoTo(slideNumber);
    slider2.slickGoTo(slideNumber);
  }, [props.selectedVariant]);

  let images = imageList.map((image, index) => {
    return (
      <Image
        src={image.image}
        alt={image.alternate_text}
        layout="responsive"
        width={image.width}
        height={image.height}
        key={index}
        className="thumbnail-holder"
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
