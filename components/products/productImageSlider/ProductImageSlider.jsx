import * as React from 'react'

import {Box} from '@mui/material'
import Image from 'next/image'
import Slider from 'react-slick'

function ProductImageSlider(props) {
  const {selectedVariant} = props
  const [styles, setStyles] = React.useState({})

  const onZoom = e => {
    const x = e.clientX - e.target.offsetLeft
    const y = e.clientY - e.target.offsetTop

    setStyles({transformOrigin: `${x}px ${y}px`, transform: 'scale(2)'})
  }

  const offZoom = () => {
    setStyles({transformOrigin: 'center center', transform: 'scale(1)'})
  }

  // let pos = {top: 0, left: 0, x: 0, y: 0}

  // const mouseMoveHandler = function (e) {
  //   // How far the mouse has been moved
  //   const dx = e.clientX - pos.x
  //   const dy = e.clientY - pos.y

  //   // Scroll the element
  //   imageRef.current.scrollTop = pos.top - dy
  //   imageRef.current.scrollLeft = pos.left - dx
  // }

  // const mouseUpHandler = function () {
  //   document.removeEventListener('mousemove', mouseMoveHandler)
  //   document.removeEventListener('mouseup', mouseUpHandler)

  //   imageRef.current.style.cursor = 'grab'
  //   imageRef.current.style.removeProperty('user-select')
  // }

  // const mouseDownHandler = function (e) {
  //   pos = {
  //     // The current scroll
  //     left: imageRef.current.scrollLeft,
  //     top: imageRef.current.scrollTop,
  //     // Get the current mouse position
  //     x: e.clientX,
  //     y: e.clientY,
  //   }
  //   console.log('pos:::', pos)

  //   document.addEventListener('mousemove', mouseMoveHandler)
  //   document.addEventListener('mouseup', mouseUpHandler)
  // }

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
        {selectedVariant.image_list.map((img, i) => (
          <Box key={i}>
            <Box
              onMouseLeave={offZoom}
              onMouseMove={onZoom}
              onMouseOver={onZoom}
              style={styles}
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
          </Box>
        ))}
      </Slider>
    </Box>
  )
}

export default ProductImageSlider
