import * as React from 'react'

import {Box, Typography} from '@mui/material'

import {useRouter} from 'next/router'
import Image from 'next/image'

import {ShowPrice} from 'sharedComponents'
import {AddToBasketWithDropDown, StarRating} from 'components/products'

export default function BestSellerItems(props) {
  const i = props.item.item
  const router = useRouter()
  const [showButton, setShowButton] = React.useState(false)
  const [activeVariant, setActiveVariant] = React.useState(i.variants[0])
  const showBox = () => setShowButton(!showButton)

  return (
    <Box
      key={i.id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 4,
      }}
    >
      <Box
        onClick={e => {
          e.preventDefault()
          router.push(`/products/${i.slug}`)
        }}
        onMouseEnter={showBox}
        onMouseLeave={showBox}
        sx={{display: 'flex', flexDirection: 'column', gap: 2}}
      >
        <Box
          sx={{
            background: 'rgba(245,245,247,1)',
            width: '100%',
            height: '400px',
            margin: '0 auto',
            position: 'relative',
            cursor: 'pointer',
          }}
        >
          <Image
            alt={i.name}
            fill={true}
            src={
              showButton
                ? i.secondary_image_resized || ''
                : i.main_image_resized || ''
            }
            style={{objectFit: showButton ? 'cover' : 'contain'}}
          />
        </Box>

        <Typography variant="h5">{i.name}</Typography>
        <Typography>
          {i.sub_title} {i.variants[0].name}
        </Typography>
      </Box>
      <Box>
        <StarRating name={i.name} score={i.review_average_score} />
        <ShowPrice selectedVariant={activeVariant} />
        <AddToBasketWithDropDown
          activeVariant={activeVariant}
          product={i}
          setActiveVariant={setActiveVariant}
        />
      </Box>
    </Box>
  )
}
