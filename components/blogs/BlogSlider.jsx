import * as React from 'react'

import {Box, Typography} from '@mui/material'
import {getBlogs} from 'services'
import Slider from 'react-slick'
import BlogCard from './BlogCard'
import 'slick-carousel/slick/slick.css'

import 'slick-carousel/slick/slick-theme.css'
function BlogSlider() {
  const BLOG = 'staff-picked'
  const [, setLoading] = React.useState(true)
  const [blogItems, setBlogItems] = React.useState([])
  const [, setError] = React.useState('')
  const sliderContainer = React.useRef()

  const settings = {
    className: 'center',
    arrows: false,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    centerMode: false,
    swipeToSlide: true,
    centerPadding: 20,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: false,
          centerPadding: 0,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: 0,
        },
      },
    ],
  }

  React.useEffect(() => {
    getBlogs(BLOG)
      .then(response => {
        setBlogItems(response.items)
        setLoading(false)
      })
      .catch(err => {
        if (err) {
          setError(err)
        } else {
          setError('Something went wrong with loading data')
        }
      })
  }, [])

  return (
    <Box mt={{xs: 10, sm: 20, my: 7}}>
      <Typography textAlign={'center'} variant="h2">
        Editor&#39;s picks
      </Typography>

      <Box
        ref={sliderContainer}
        sx={{width: {xs: '90%', sm: '85%', md: '70%'}, margin: '50px auto'}}
      >
        <Slider {...settings}>
          {blogItems.length
            ? blogItems.map((blogItem, i) => (
                <BlogCard
                  blog={blogItem.item}
                  index={i}
                  key={blogItem.item.id}
                />
              ))
            : null}
        </Slider>
      </Box>
    </Box>
  )
}

export default BlogSlider
