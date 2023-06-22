import * as React from 'react'

import {Box, Typography} from '@mui/material'
import {getBlogs} from 'services'

import Slider from 'react-slick'

import {BlogImage} from './blogImage'

function BlogSlider() {
  const BLOG = 'staff-picked'
  const [, setLoading] = React.useState(true)
  const [slidesNo, setSlidesNo] = React.useState(1)
  const [blogItems, setBlogItems] = React.useState([])
  const [, setError] = React.useState('')
  const sliderContainer = React.useRef()

  // const settings = {
  //   arrows: true,
  //   dots: true,
  //   infinite: false,
  //   speed: 500,

  //   slidesToScroll: 1,
  //   centerMode: false,
  //   swipeToSlide: true,
  //   centerPadding: 20,
  // }

  React.useEffect(() => {
    const containerWidth = sliderContainer.current.clientWidth

    if (containerWidth < 540) {
      setSlidesNo(1)
    } else if (containerWidth < 1330) {
      setSlidesNo(2)
    } else {
      setSlidesNo(3)
    }

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
    <Box mt={{xs: 10, sm: 20}}>
      <Typography textAlign={'center'} variant="h2">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        EDITOR'S PICKS
      </Typography>

      <Box
        ref={sliderContainer}
        sx={{width: {xs: '90%', sm: '85%', md: '70%'}, margin: '50px auto'}}
      >
        <Slider slidesToShow={slidesNo}>
          {blogItems.length
            ? blogItems.map((blogItem, i) => (
                <BlogImage
                  index={i}
                  item={blogItem.item}
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
