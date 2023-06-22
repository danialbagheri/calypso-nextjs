import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import {ReviewDetail} from './ReviewDetail'
import {ReviewContext} from 'components/CustomersReview/ReviewProvider'

function Reviews() {
  const [reviewState] = React.useContext(ReviewContext)

  // const theme = useTheme()

  return (
    <Box>
      <Typography color={'secondary'} mt={9} variant={'h3'}>
        {reviewState.reviewData.results.length} Reviews
      </Typography>
      <Box mt={11}>
        {reviewState.reviewData.results.map(detail => (
          <ReviewDetail key={detail.id} {...detail} />
        ))}
      </Box>
      {/*TO DO ::: Implement pagination functionality  */}
      {/*<Box mt={15}>*/}
      {/*  <Pagination*/}
      {/*    count={Math.ceil(+reviewState.reviewData.count / 10)}*/}
      {/*    color={'primary'}*/}
      {/*    sx={{*/}
      {/*      '&': {*/}
      {/*        ul: {justifyContent: 'center'},*/}
      {/*        svg: {color: theme.palette.primary.main},*/}
      {/*      },*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</Box>*/}
    </Box>
  )
}

export default Reviews
