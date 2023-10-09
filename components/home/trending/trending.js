import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Loader from 'react-loaders'
import 'loaders.css/loaders.min.css'

import {TrendingItem} from './trendingItem'
import {Box} from '@mui/material'

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
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
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

  if (!props.trending.length) {
    return
  }

  return (
    <Box sx={{maxWidth: 'min(1400px , 90%)', margin: '0 auto', mt: '5rem'}}>
      <h1>Trending</h1>

      {isLoaded ? (
        <Slider {...settings}>
          {topSeller.map(({item}) => (
            <TrendingItem item={{...item}} key={item.id} />
          ))}
        </Slider>
      ) : (
        <Loader
          active={true}
          className="p-2 general-loader"
          color="orange"
          size="Large"
          type="ball-pulse"
        />
      )}
    </Box>
  )
}
