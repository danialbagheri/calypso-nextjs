import {Box} from '@mui/material'
import Image from 'next/image'
import Slider from 'react-slick'

function ProductImageSlider(props) {
  const {selectedVariant} = props

  const settings = {
    customPaging: function (i) {
      return (
        <Image
          alt={selectedVariant.image_list[i]?.alternate_text}
          fill={true}
          src={selectedVariant.image_list[i]?.resized}
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
          display: 'none !important',
        },

        '& .slick-arrow:before': {
          display: 'none !important',
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
            key={i}
            sx={{
              width: '100%',
              height: '500px',
              position: 'relative',
            }}
          >
            <Image
              alt={img.alternate_text}
              fill={true}
              src={img.image}
              style={{objectFit: 'contain'}}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

export default ProductImageSlider
