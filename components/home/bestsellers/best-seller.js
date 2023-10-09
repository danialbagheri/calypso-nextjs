import Image from 'next/image'
import Link from 'next/link'
import {Box} from '@mui/material'

import BestSellerItems from './BestSellerItems'

export default function BestSeller(props) {
  const collection = props.bestseller

  if (!collection.items) {
    return
  }

  return (
    <Box sx={{maxWidth: '1440px', margin: '0 auto', mt: '5rem'}}>
      <h1 className="textCenter">Top Seller products</h1>
      {collection ? (
        <Box
          sx={{
            display: 'flex',
            gap: 5,
            flexDirection: {xs: 'column', lg: 'row'},
            padding: 5,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: {xs: '500px', sm: '600px', lg: 'unset'},
            }}
          >
            {collection.slider?.slides?.length > 0 ? (
              <Box className="banner">
                <Link
                  href={
                    collection.slider.slides[0].link
                      ? collection.slider.slides[0].link
                      : '#'
                  }
                >
                  <picture>
                    <source
                      media="(min-width: 1536px)"
                      srcSet={collection.slider.slides[0].xl_image}
                      type="image/png"
                    />
                    <source
                      media="(min-width: 1200px)"
                      srcSet={collection.slider.slides[0].lg_image}
                      type="image/png"
                      width="1536"
                    />
                    <source
                      media="(min-width: 900px)"
                      srcSet={collection.slider.slides[0].md_image}
                      type="image/png"
                      width="1200"
                    />
                    <source
                      media="(min-width: 600px)"
                      srcSet={collection.slider.slides[0].sm_image}
                      type="image/png"
                      width="900"
                    />
                    <source
                      media="(min-width: 0px)"
                      srcSet={collection.slider.slides[0].xs_image}
                      type="image/png"
                      width="600"
                    />
                    <img
                      alt={collection.slider.slides[0].image_alt_text}
                      className="hero-image"
                      src={collection.slider.slides[0].md_image}
                    />
                  </picture>
                </Link>
              </Box>
            ) : (
              <Image
                alt="Calypso Best Seller products"
                fill
                src={collection.image || ''}
                style={{objectFit: 'cover'}}
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </Box>
          <Box
            sx={{
              width: '100%',

              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gridTemplateRows: 'auto',
              rowGap: 4,
              columnGap: 2,
            }}
          >
            {collection.items?.slice(0, 6).map((item, index) => (
              <BestSellerItems item={item} key={index} />
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}
