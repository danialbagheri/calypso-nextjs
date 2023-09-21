/* -------------------------------- Libraries ------------------------------- */
import Slider from 'react-slick'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box} from '@mui/material'
import {useTheme} from '@emotion/react'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import StarRating from './StarRating/StarRating'
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Style --------------------------------- */
import Styles from '../../styles/relatedProducts.module.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
/* -------------------------------------------------------------------------- */

export default function RelatedProducts({related}) {
  const theme = useTheme()

  const settings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    dotsClass: 'dot',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const relatedProducts = related.map((product, index) => {
    return (
      <div key={index}>
        <a href={`/products/${encodeURIComponent(product.slug)}`}>
          <div className={Styles.productHolder}>
            <div className={Styles.ProductImage}>
              <picture>
                <source srcSet={product.webp} type="image/webp" />
                <source media="(max-width: 600px)" srcSet={product.resized} />
                <img
                  alt={product.name}
                  height={product.img_height}
                  loading="lazy"
                  src={product.main_image}
                  width={product.img_width}
                />
              </picture>
            </div>

            <div className={Styles.bottomText}>
              <StarRating
                name={product.name}
                score={product.review_average_score}
              />
              <p>
                <strong>{product.name}</strong> <br />
                {product.sub_title}
              </p>
              <p>from £{product.starting_price}</p>
            </div>
          </div>
        </a>
      </div>
    )
  })
  return (
    <Box sx={{backgroundColor: theme.palette.sand.main, p: 3}}>
      <h4 className="textCenter">You may also like</h4>
      <Slider {...settings}>{relatedProducts}</Slider>
    </Box>
  )
}
