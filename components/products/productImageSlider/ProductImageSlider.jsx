import {Box} from '@mui/material'
import Image from 'next/image'
import * as React from 'react'
import Slider from 'react-slick'

function ProductImageSlider(props) {
  const {selectedVariant} = props

  const settings = {
    customPaging: function (i) {
      return (
        <Image
          src={selectedVariant.image_list[i]?.resized}
          alt={selectedVariant.image_list[i]?.alternate_text}
          fill={true}
          style={{objectFit: 'cover'}}
        />
      )
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  return (
    <Box
      sx={{
        position: {xs: 'relative', sm: 'sticky'},
        top: {xs: 0, sm: '70px'},

        '& .slick-arrow': {
          top: '40%',
        },

        '& .slick-arrow:before': {
          color: '#999 !important',
        },

        '& .slick-arrow.slick-next': {
          right: '-23px !important',
        },

        '&>.slick-initialized>ul': {
          position: 'relative',
          bottom: 0,
          marginTop: 5,
          display: 'flex !important',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 4,

          '&>.slick-active': {
            boxShadow: ' 0 0 0 2px #ff6b00',
            borderColor: 'transparent',
          },
          li: {
            position: 'relative',
            width: 60,
            height: 60,
            border: '2px solid rgba(0,0,0,0.1)',
            borderRadius: '50%',
            overflow: 'hidden',
          },
        },
      }}
    >
      <Slider {...settings}>
        {selectedVariant.image_list.map((img, i) => (
          <Box
            sx={{
              width: '100%',
              height: '500px',
              position: 'relative',
            }}
          >
            <Image
              src={img.image}
              alt={img.alternate_text}
              fill={true}
              style={{objectFit: 'contain'}}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

export default ProductImageSlider
