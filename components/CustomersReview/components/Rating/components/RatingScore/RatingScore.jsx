import * as React from 'react'

import {ReviewContext} from 'components/CustomersReview/ReviewProvider'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import StarIcon from '@mui/icons-material/Star'
import Rating from '@mui/material/Rating'
import {useTheme} from '@mui/material'

function RatingScore() {
  const [reviewState] = React.useContext(ReviewContext)
  const theme = useTheme()

  return (
    <Stack direction={'row'} alignItems={'center'} spacing={3}>
      <Typography variant={'h2'} color={'secondary'}>
        {reviewState.product.review_average_score}
      </Typography>
      <Rating
        sx={{
          '& .MuiRating-icon': {
            color: theme.palette.golden.main,
          },
        }}
        defaultValue={Math.round(+reviewState.product.review_average_score)}
        readOnly
        emptyIcon={<StarIcon color={'grey'} fontSize="inherit" />}
      />
      <Stack direction={'row'} alignItems={'center'} spacing={2}>
        <Typography variant={'h4'}>{reviewState.starReviewCount}</Typography>
        <Typography variant={'h4'}>
          Rating<span>{reviewState.starReviewCount > 1 ? 's' : ''}</span>
        </Typography>
      </Stack>
    </Stack>
  )
}

export default RatingScore
