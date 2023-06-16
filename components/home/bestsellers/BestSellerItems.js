import * as React from 'react'

import _ from 'lodash'

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
        onMouseEnter={showBox}
        onMouseLeave={showBox}
        sx={{display: 'flex', flexDirection: 'column', gap: 2}}
        onClick={() => router.push(`/products/${i.slug}`)}
      >
        <Box
          sx={{
            backgroundColor: '#f8f8fb',
            width: '100%',
            height: '300px',
            margin: '0 auto',
            position: 'relative',

            cursor: 'pointer',
          }}
        >
          <Image
            fill={true}
            style={{objectFit: 'contain'}}
            src={showButton ? i.secondary_image_resized : i.main_image_resized}
            alt={i.name}
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
          product={i}
          activeVariant={activeVariant}
          setActiveVariant={setActiveVariant}
        />
      </Box>
    </Box>
  )
}
