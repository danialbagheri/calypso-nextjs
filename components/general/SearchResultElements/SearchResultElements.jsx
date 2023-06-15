import * as React from 'react'

import {useRouter} from 'next/router'

import {AddToBasket} from './addToBasket'

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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 2,
      }}
      key={product.id}
    >
      <Box
        sx={{cursor: 'pointer'}}
        onClick={e => {
          setLoading(true)
          e.preventDefault()
          router.push(`/products/${product.slug}`).then(() => {
            setLoading(false)
          })
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: 250,
            background: theme.palette.sand.main,
          }}
        >
          <Image fill src={product.main_image} style={{objectFit: 'contain'}} />
        </Box>
        <Typography sx={{mt: 2}} variant="h4">
          {product.name}
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
            spin
            icon={faSpinner}
            className="calypso-orange-text"
            size={'2x'}
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
