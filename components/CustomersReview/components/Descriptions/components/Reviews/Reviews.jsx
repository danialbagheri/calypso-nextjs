import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import {ReviewDetail} from './ReviewDetail'
import {ReviewContext} from 'components/CustomersReview/ReviewProvider'

function Reviews() {
  const [reviewState] = React.useContext(ReviewContext)

  return (
    <Box>
      <Typography color={'secondary'} mt={9} variant={'h3'}>
        {reviewState.reviewData.count} Reviews
      </Typography>
      <Box mt={11}>
        {reviewState.reviewData.results.map(detail => (
          <ReviewDetail key={detail.id} {...detail} />
        ))}
      </Box>
    </Box>
  )
}

export default Reviews
