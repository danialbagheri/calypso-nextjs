import {Box, Typography} from '@mui/material'
import {StarRating} from 'components/products'
import Image from 'next/image'

import {ShowPrice} from 'sharedComponents'

export function RecommendedItem(props) {
  const {data} = props

  return (
    <Box
      onClick={() => {
        window.open(`/products/${data.slug}?sku=${data.sku}`)
      }}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 3,
        height: '100%',
        flexGrow: 1,

        cursor: 'pointer',
      }}
    >
      <Box
        sx={{
          background:
            'linear-gradient(180deg, rgba(245,245,247,1) 100%, rgba(255,255,255,1) 100%)',
          width: '100%',
          height: '300px',
          margin: '0 auto',
          position: 'relative',
          transition: 'all 200ms',
          borderRadius: 1,
          '&:hover': {
            background:
              'linear-gradient(180deg, rgba(252,245,236,1) 100%, rgba(255,255,255,1) 100%)',
          },
        }}
      >
        <Image
          alt={data.image_list[0].alternate_text}
          fill
          src={data.image_list[0].image}
          style={{objectFit: 'contain'}}
        />
      </Box>
      <Typography variant="h5">{data.name}</Typography>

      <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        <Box className="centralize" gap={3}>
          <StarRating name={data.name} score={data.review_average_score} />
          <Typography>{data.review_average_score}</Typography>
        </Box>
        <hr className="m-0" />
        <ShowPrice selectedVariant={data} />
      </Box>
    </Box>
  )
}
