import {Box} from '@mui/material'
import Image from 'next/image'
import Slider from 'react-slick'

function ProductImageSlider(props) {
  const {selectedVariant} = props

  const onZoom = e => {
    const parentNode = e.target.parentNode.parentNode.parentNode.parentNode

    const x = 0.7 * e.clientX - e.target.offsetLeft
    const y = 0.7 * e.clientY - e.target.offsetTop

    parentNode.style.transformOrigin = `${x}px ${y}px`
    parentNode.style.transform = 'scale(2)'
  }

  const offZoom = e => {
    const parentNode = e.target.parentNode.parentNode.parentNode.parentNode

    parentNode.style.transform = 'scale(1)'
    parentNode.style.transformOrigin = 'center center'
  }

  const settings = {
    customPaging: function (i) {
      return (
        <Image
          alt={selectedVariant.image_list[i]?.alternate_text}
          fill={true}
          src={selectedVariant.image_list[i]?.image}
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
        overflow: 'scroll',

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
        {selectedVariant.image_list.map((img, i) => {
          const isGif = img.image.includes('.gif')
          return (
            <Box key={i}>
              <Box
                sx={{
                  width: '100%',
                  height: '500px',
                  position: 'relative',
                }}
              >
                <Image
                  alt={img.alternate_text}
                  fill={true}
                  onMouseLeave={isGif ? null : offZoom}
                  onMouseMove={isGif ? null : onZoom}
                  onMouseOver={isGif ? null : onZoom}
                  src={img.image}
                  style={{
                    objectFit: isGif ? 'cover' : 'contain',
                  }}
                />
              </Box>
            </Box>
          )
        })}
      </Slider>
    </Box>
  )
}

export default ProductImageSlider
