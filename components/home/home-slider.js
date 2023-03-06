import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import Image from "next/image";
import Link from 'next/link'
export default function HomeSlider({slides}) {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: 'progressive',
    // slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'dot',
  }
  const slider = slides[0].slider_slides.map(slide => {
    if (slide.slide.custom_slide) {
      return (
        <div className="banner" index={slide.slide.id} key={slide.slide.id}>
          <div itemProp="articleBody" dangerouslySetInnerHTML={{__html: slide.slide.custom_code}} />
        </div>
      )
    } else {
      return (
        <div className="banner" index={slide.id} key={slide.id}>
          <Link href={slide.slide.link ? slide.slide.link : '/about'}>
            <picture>
              <source media="(min-width: 1536px)" srcSet={slide.slide.xl_image} type="image/png" />
              <source media="(min-width: 1200px)" width="1536" srcSet={slide.slide.lg_image} type="image/png" />
              <source media="(min-width: 900px)" width="1200" srcSet={slide.slide.md_image} type="image/png" />
              <source media="(min-width: 600px)" width="900" srcSet={slide.slide.sm_image} type="image/png" />
              <source media="(min-width: 0px)" width="600" srcSet={slide.slide.xs_image} type="image/png" />
              <img src={slide.slide.md_image} alt={slide.slide.image_alt_text} className="hero-image" />
            </picture>
          </Link>
        </div>
      )
    }
  })

  return (
    <div>
      <Slider {...settings}>{slider}</Slider>
    </div>
  )
}
