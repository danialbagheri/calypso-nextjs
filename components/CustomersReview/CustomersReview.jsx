import * as React from 'react'

import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'

import {ReviewProvider} from './ReviewProvider'
import {Descriptions, Rating, ReviewPagination} from './components'
import {AppContext} from 'components/appProvider'
//Styles
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

function CustomersReview(props) {
  const [, setAppState] = React.useContext(AppContext)

  if (!props.reviewData) {
    return null
  }

  //eslint-disable-next-line
  React.useEffect(() => {
    setAppState(prev => ({...prev, productQuestions: props.product.questions}))
  }, [])

  return (
    <ScopedCssBaseline>
      <ReviewProvider
        product={props.product}
        reviewData={props.reviewData}
        slug={props.slug}
      >
        <Box sx={{padding: {xs: '60px 36px', lg: '80px 144px'}}}>
          <Typography mb={8} variant={'h3'}>
            Customer reviews
          </Typography>
          <Grid container spacing={{xs: 9, md: 20}}>
            <Rating />
            <Descriptions />
          </Grid>
          {props.reviewData.count > 10 ? <ReviewPagination /> : null}
        </Box>
      </ReviewProvider>
    </ScopedCssBaseline>
  )
}

export default CustomersReview
