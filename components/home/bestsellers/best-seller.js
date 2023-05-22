import Image from 'next/image'
import Styles from 'styles/bestseller.module.css'
import {Box} from '@mui/material'
import BestSellerItems from './BestSellerItems'

export default function BestSeller(props) {
  const collection = props.bestseller

  const collectionItems = collection.items.slice(0, 6).map((item, index) => {
    return <BestSellerItems item={item} key={index} />
  })

  const collectionHTML = (
    <div>
      {collection ? (
        <div className={Styles.Container}>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: {xs: '400px', md: '400px', lg: '900px'},
            }}
          >
            <Image
              src={collection.image}
              alt="Calypso Best Seller products"
              fill
              style={{objectFit: 'cover'}}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Box>
          {/* <div>
            <source srcSet={collection.webp} type="image/webp" />
            <source srcSet={collection.resized} media="(max-width: 600px)" />
            <img src={collection.image} alt="Calypso Best Seller products" />
          </div> */}
          <div className={Styles.productContainer}>{collectionItems}</div>
        </div>
      ) : null}
    </div>
  )
  return (
    <div>
      <h1 className="textCenter">Top Seller products</h1>
      {collectionHTML}
    </div>
  )
}
