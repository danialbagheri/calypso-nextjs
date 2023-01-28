import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'

import {ReviewDetail} from './ReviewDetail'
import {ReviewContext} from 'components/CustomersReview/ReviewProvider'
import {useTheme} from '@mui/material'

function Reviews(props) {
  const [reviewState] = React.useContext(ReviewContext)
  const theme = useTheme()

  return (
    <Box>
      <Typography color={'secondary'} variant={'h3'} mt={2}>
        {reviewState.product.reviews.length} Reviews
      </Typography>
      <Box mt={11}>
        {reviewState.product.reviews.map(detail => (
          <ReviewDetail {...detail} />
        ))}
      </Box>
      <Box mt={15}>
        <Pagination
          count={10}
          color={'primary'}
          sx={{
            '&': {
              ul: {justifyContent: 'center'},
              svg: {color: theme.palette.primary.main},
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default Reviews
