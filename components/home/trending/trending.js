import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loaders'
import 'loaders.css/loaders.min.css'
import TrendingItem from './trending-item'
import Box from '@mui/material/Box'

export default function Trending(props) {
  const isLoaded = true
  const topSeller = props.trending

  const settings = {
    slidesToShow: 5,
    arrows: true,
    dots: false,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1236,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const trendingItems = topSeller.map((each, index) => {
    return (
      <Box key={index}>
        <TrendingItem product={each.item} />
      </Box>
    )
  })

  const trendingProducts = isLoaded ? (
    <Slider {...settings}>{trendingItems}</Slider>
  ) : (
    <Loader type="ball-pulse" active={true} color="orange" size="Large" className="p-2 general-loader" />
  )
  return (
    <div className="trending-slider">
      <h1>Trending</h1>
      {trendingProducts}
    </div>
  )
}
