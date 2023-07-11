import * as React from 'react'

import {Pagination, Stack, useTheme} from '@mui/material'
import {getProductReviews} from 'services'
import {ReviewContext} from 'components/CustomersReview/ReviewProvider'

function ReviewPagination() {
  const theme = useTheme()

  const [reviewState, setReviewState] = React.useContext(ReviewContext)

  const paginationHandler = (e, v) => {
    e.preventDefault()

    getProductReviews(reviewState.product.slug, v)
      .then(res => {
        setReviewState(prev => ({
          ...prev,
          reviewData: {...prev.reviewData, results: res.results},
        }))
      })
      .catch(err => console.log(err))
  }

  return (
    <Stack alignItems={'center'} justifyContent={'center'} mt={15}>
      <Pagination
        color={'primary'}
        count={Math.ceil(+reviewState.reviewData.count / 10)}
        onChange={paginationHandler}
        sx={{
          '&': {
            ul: {justifyContent: 'center'},
            svg: {color: theme.palette.primary.main},
            'button.Mui-selected': {
              color: '#fff',
              fontWeight: 'bold',
            },
            'button.Mui-selected:hover': {
              bgcolor: theme.palette.primary.main,
            },
          },
        }}
      />
    </Stack>
  )
}

export default ReviewPagination
