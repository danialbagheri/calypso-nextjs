import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {Box} from '@mui/material'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'

const SliderItem = slide => {
  const [imgSrc, setImgSrc] = useState('xl_image')
  const router = useRouter()

  useEffect(() => {
    if (window) {
      const imgSrcHandler = () => {
        const windowWidth = window.innerWidth
        if (windowWidth < 600) {
          setImgSrc('xs_image')
        } else if (windowWidth < 900) {
          setImgSrc('sm_image')
        } else if (windowWidth < 1200) {
          setImgSrc('md_image')
        } else if (windowWidth < 1536) {
          setImgSrc('lg_image')
        } else {
          setImgSrc('xl_image')
        }
      }

      imgSrcHandler()
      window.addEventListener('resize', imgSrcHandler)
    }
  }, [])

  const clickHandler = () => {
    router.push(slide.slide.link || '/about')
  }

  if (slide.slide.custom_slide) {
    return (
      <Box onClick={clickHandler}>
        <div
          dangerouslySetInnerHTML={{__html: slide.slide.custom_code}}
          itemProp="articleBody"
        />
      </Box>
    )
  }

  return (
    <Box
      index={slide.id}
      onClick={clickHandler}
      sx={{
        position: 'relative',
        height: {xs: 400, ssm: 500, sm: 800, md: 500, lg: 600},
        cursor: 'pointer',
      }}
    >
      <Image
        alt={slide.slide.image_alt_text}
        fill
        src={slide.slide[imgSrc]}
        style={{objectFit: 'cover'}}
      />
    </Box>
  )
}

export default function HomeSlider({slides, second}) {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    lazyLoad: 'progressive',
    slidesToScroll: 1,
    dotsClass: 'dot',
  }

  return (
    <Box
      sx={{
        mt: second ? '5rem' : 0,
        '& button.slick-arrow': {
          display: 'none !important',
        },
      }}
    >
      <Slider {...settings}>
        {slides[0]?.slider_slides.map(slide => (
          <SliderItem key={slide.id} slide={slide} />
        ))}
      </Slider>
    </Box>
  )
}
