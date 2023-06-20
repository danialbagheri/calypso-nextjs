import * as React from 'react'

/* ----------------------------- Next Components ---------------------------- */
import Image from 'next/image'
import {useRouter} from 'next/navigation'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, Typography, useTheme} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {StarRating} from '../StarRating'
import {AddToBasketWithDropDown} from '../detail'
import {ShowPrice} from 'sharedComponents'
/* -------------------------------------------------------------------------- */

export default function ProductRangeItem(props) {
  const {product} = props

  const theme = useTheme()
  const router = useRouter()
  const [activeVariant, setActiveVariant] = React.useState(product.variants[0])

  return (
    <Box
      key={product.id}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 3,
        height: '100%',
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          cursor: 'pointer',
        }}
        onClick={() => {
          router.push(`/products/${product.slug}`)
        }}
      >
        <Box
          sx={{
            background:
              'linear-gradient(180deg, rgba(245,245,247,1) 84%, rgba(255,255,255,1) 85%)',
            width: '100%',
            height: '300px',
            margin: '0 auto',
            position: 'relative',
            transition: 'all 200ms',
            borderRadius: 1,
            '&:hover': {
              background:
                'linear-gradient(180deg, rgba(252,245,236,1) 84%, rgba(255,255,255,1) 85%)',
            },
          }}
        >
          {product.collection_names.length > 0 ? (
            <Box
              sx={{
                borderRadius: '3px',
                fontSize: '11px',
                fontWeight: 700,
                zIndex: 2,
                position: 'absolute',
                top: 10,
                right: 10,
                color: 'white',
                backgroundColor: '#fff',
                color: 'black',
                padding: '3px 10px',
              }}
            >
              {product.collection_names[0]}
            </Box>
          ) : null}
          <Image
            fill={true}
            style={{objectFit: 'contain'}}
            src={
              activeVariant.image_list[0]
                ? activeVariant.image_list[0].image
                : product.main_image
            }
            alt={product.name}
          />
        </Box>
        <Typography variant="h5">{product.name}</Typography>
        <Typography>{product.sub_title}</Typography>
      </Box>

      <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        <StarRating name={product.name} score={product.review_average_score} />
        <hr className="m-0" />
        <ShowPrice selectedVariant={activeVariant} />
        <AddToBasketWithDropDown
          product={product}
          activeVariant={activeVariant}
          setActiveVariant={setActiveVariant}
        />
      </Box>
    </Box>
  )
}
