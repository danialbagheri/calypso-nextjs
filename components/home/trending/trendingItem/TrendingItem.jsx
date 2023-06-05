import * as React from 'react'

/* ---------------------------- Nextjs Components --------------------------- */
import Image from 'next/image'
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* ------------------------- Material UI components ------------------------- */
import Box from '@mui/system/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
/* -------------------------------------------------------------------------- */

function TrendingItem({item}) {
  const {
    main_image,
    name,
    secondary_image,
    sub_title,
    review_average_score,
    lowest_variant_price,
    slug,
  } = item

  const [imageSrc, setImageSrc] = React.useState(main_image)

  const router = useRouter()

  const mouseHoverHandler = (e, state) => {
    e.preventDefault()
    switch (state) {
      case 'enter':
        setImageSrc(secondary_image)
        break
      case 'leave':
        setImageSrc(main_image)
        break
      default:
        setImageSrc(main_image)
    }
  }

  const clickHandler = e => {
    e.preventDefault()
    router.push(`/products/${slug}`)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 4,

        cursor: 'pointer',
      }}
      onClick={e => clickHandler(e)}
    >
      <Box
        sx={{
          position: 'relative',

          height: '230px',
          width: {xs: '150px', smd: '240px', lg: '260px'},
          height: {xs: '230px', smd: '360px', lg: '400px'},

          borderRadius: 1,

          overflow: 'hidden',
        }}
        onMouseEnter={e => mouseHoverHandler(e, 'enter')}
        onMouseLeave={e => mouseHoverHandler(e, 'leave')}
      >
        <Image src={imageSrc} alt={name} fill objectFit="cover" />
      </Box>
      <Box>
        <Typography variant={'h4'}>{name}</Typography>
        <Typography mt={1}>{sub_title}</Typography>
      </Box>
      <Typography className="trending-box-price">
        From £{lowest_variant_price}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Rating
          name="size-medium"
          defaultValue={Number(review_average_score)}
          readOnly
          precision={0.5}
        />
        <Typography variant={'body2'}>{review_average_score}</Typography>
      </Box>
    </Box>
  )
}

export default TrendingItem
