import Link from 'next/link'
import Image from 'next/image'
import Styles from '../../styles/sunready.module.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {Box} from '@mui/system'

export default function RecommendedProducts({products}) {
  // const [productsData, setProductsData] = useState(products);
  // products ? setProductsData(products) : setProductsData([]);
  const settings = {
    arrows: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
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

  const recommendedProducts = products.map(product => {
    const firstImage = product.variants[0].image_list[0]
    return (
      <div key={product.id}>
        <div className={Styles.productHolder}>
          <Link href={`/products/${product.slug}`} key={product.id}>
            <Box sx={{width: '100%', height: '400px', position: 'relative'}}>
              <Image
                alt={product.name}
                fill
                src={firstImage.image}
                style={{objectFit: 'contain'}}
              />
            </Box>
            <div className="text-centre">
              <h6>{product.name}</h6>
              <p>
                {product.sub_title}
                <br />
              </p>
              <p>
                <strong>from £{product.lowest_variant_price}</strong>
              </p>
            </div>
          </Link>
        </div>
      </div>
    )
  })
  return (
    <div className="mt-4 mb-0">
      <div className="bg-secondary p-3">
        <h4 className={Styles.sunReadyTitle}>STAY SAFE WITH CALYPSO</h4>
        <Slider {...settings}>{recommendedProducts}</Slider>
      </div>
    </div>
  )
}
