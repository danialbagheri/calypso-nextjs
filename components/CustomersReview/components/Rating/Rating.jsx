import * as React from 'react'

import Grid from '@mui/material/Grid'
import {Divider} from '@mui/material'

import {
  RatingScore,
  ReviewWithImages,
  StartReviewDetail,
  WriteReview,
} from './components'
import {ReviewContext} from 'components/CustomersReview/ReviewProvider'

function Rating() {
  const [reviewState] = React.useContext(ReviewContext)
  const [hasReviewWithImg, setHasReviewWithImg] = React.useState(false)

  React.useEffect(() => {
    for (let i = 0; i < reviewState.reviewData.results.length; i++) {
      if (reviewState.reviewData.results[i].images.length > 0) {
        setHasReviewWithImg(true)
        break
      }
    }
  }, [])

  return (
    <Grid item md={4} pr={6} xs={12}>
      <RatingScore />
      <StartReviewDetail />
      <Divider sx={{marginBottom: 8, marginTop: 8}} />
      <WriteReview />
      {hasReviewWithImg ? (
        <>
          <Divider sx={{marginBottom: 8, marginTop: 8}} />
          <ReviewWithImages />
        </>
      ) : null}
    </Grid>
  )
}

export default Rating
