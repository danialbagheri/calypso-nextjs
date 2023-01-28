import * as React from 'react'

import Grid from '@mui/material/Grid'
import {Divider} from '@mui/material'

import {
  RatingScore,
  ReviewWithImages,
  StartReviewDetail,
  WriteReview,
} from './components'

function Rating() {
  return (
    <Grid item xs={12} md={4} pr={6}>
      <RatingScore />
      <StartReviewDetail />
      <Divider sx={{marginBottom: 8, marginTop: 8}} />
      <WriteReview />
      <Divider sx={{marginBottom: 8, marginTop: 8}} />
      <ReviewWithImages />
    </Grid>
  )
}

export default Rating
