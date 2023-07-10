import * as React from 'react'

import {useRouter} from 'next/router'

import style from './searchResultElements.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons/faSpinner'
import {Box, Typography, useTheme} from '@mui/material'
import Image from 'next/image'

function SearchResultElements({product}) {
  const theme = useTheme()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  return (
    <Box
      key={product.id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box
        onClick={e => {
          setLoading(true)
          e.preventDefault()
          router.push(`/products/${product.slug}`).then(() => {
            setLoading(false)
          })
        }}
        sx={{cursor: 'pointer', mb: 6}}
      >
        <Box
          sx={{
            position: 'relative',
            height: 250,
            background: product.main_image
              ? theme.palette.grey.main
              : theme.palette.sand.main,
          }}
        >
          <Image
            alt={'image'}
            fill
            src={product.main_image || '/placeholder.png'}
            style={{objectFit: 'contain'}}
          />
        </Box>
        <Typography sx={{mt: 2}} variant="h4">
          {product.name}
        </Typography>
        <Typography sx={{mt: 2}} variant="h6">
          {product.sub_title}
        </Typography>
      </Box>
      {/* <div className={`text-centre ${style.productSubTitle}`}>
        <span>{product.sub_title}</span>
      </div> */}
      {/* <div className={`${style.tagsContainer}`}>
        {product.tags.slice(1, 6).map(tag => (
          <div key={tag.id} className={style.singleTag}>
            {tag.name}
          </div>
        ))}
      </div> */}
      {loading ? (
        <div className={style.loadingContainer}>
          <FontAwesomeIcon
            className="calypso-orange-text"
            icon={faSpinner}
            size={'2x'}
            spin
          />
        </div>
      ) : null}
      {/* 
      <AddToBasket
        variantId={product.variants[0].shopify_storefront_variant_id}
        quantity={1}
      /> */}
    </Box>
  )
}

export default SearchResultElements
