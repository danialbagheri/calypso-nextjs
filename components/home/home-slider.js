import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import Image from "next/image";
import Link from 'next/link'
import {Box} from '@mui/material'
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
          <div
            dangerouslySetInnerHTML={{__html: slide.slide.custom_code}}
            itemProp="articleBody"
          />
        </div>
      )
    }
    return (
      <Box className="banner" index={slide.id} key={slide.id}>
        <Link href={slide.slide.link ? slide.slide.link : '/about'}>
          <picture>
            <source
              media="(min-width: 1536px)"
              srcSet={slide.slide.xl_image}
              type="image/png"
            />
            <source
              media="(min-width: 1200px)"
              srcSet={slide.slide.lg_image}
              type="image/png"
              width="1536"
            />
            <source
              media="(min-width: 900px)"
              srcSet={slide.slide.md_image}
              type="image/png"
              width="1200"
            />
            <source
              media="(min-width: 600px)"
              srcSet={slide.slide.sm_image}
              type="image/png"
              width="900"
            />
            <source
              media="(min-width: 0px)"
              srcSet={slide.slide.xs_image}
              type="image/png"
              width="600"
            />
            <img
              alt={slide.slide.image_alt_text}
              className="hero-image"
              src={slide.slide.md_image}
            />
          </picture>
        </Link>
      </Box>
    )
  })

  return (
    <Box
      sx={{
        '& button.slick-arrow': {
          display: 'none !important',
        },
      }}
    >
      <Slider {...settings}>{slider}</Slider>
    </Box>
  )
}
