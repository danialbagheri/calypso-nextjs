import Image from 'next/image'

import {Box} from '@mui/material'

import BestSellerItems from './BestSellerItems'

export default function BestSeller(props) {
  const collection = props.bestseller

  return (
    <Box sx={{maxWidth: '1440px', margin: '0 auto'}}>
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
            <Image
              alt="Calypso Best Seller products"
              fill
              src={collection.image}
              style={{objectFit: 'cover'}}
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Box>
          <Box
            sx={{
              width: '100%',

              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gridTemplateRows: 'auto',
              rowGap: 4,
              columnGap: 2,
            }}
          >
            {collection.items.slice(0, 6).map((item, index) => (
              <BestSellerItems item={item} key={index} />
            ))}
          </Box>
        </Box>
      ) : null}
    </Box>
  )
}
