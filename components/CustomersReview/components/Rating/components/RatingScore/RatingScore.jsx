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
    <Stack alignItems={'center'} direction={'row'} spacing={3}>
      <Typography color={'secondary'} variant={'h2'}>
        {reviewState.reviewData.review_average_score.toFixed(1)}
      </Typography>
      <Rating
        defaultValue={Math.round(+reviewState.reviewData.review_average_score)}
        emptyIcon={<StarIcon color={'grey'} fontSize="inherit" />}
        readOnly
        sx={{
          '& .MuiRating-icon': {
            color: theme.palette.golden.main,
          },
        }}
      />
      <Stack alignItems={'center'} direction={'row'} spacing={2}>
        <Typography variant={'h4'}>
          {reviewState.reviewData.total_review_count}
        </Typography>
        <Typography variant={'h4'}>
          Rating
          <span>
            {reviewState.reviewData.total_review_count > 1 ? 's' : ''}
          </span>
        </Typography>
      </Stack>
    </Stack>
  )
}

export default RatingScore
