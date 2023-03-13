import * as React from 'react'

import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'

import {ReviewProvider} from './ReviewProvider'
import {Rating, Descriptions} from './components'
//Styles
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

function CustomersReview(props) {
  if (!props.reviewData) return null
  return (
    <ScopedCssBaseline>
      <ReviewProvider
        product={props.product}
        slug={props.slug}
        reviewData={props.reviewData}
      >
        <Box sx={{padding: {xs: '60px 36px', lg: '80px 144px'}}}>
          <Typography variant={'h3'} mb={8}>
            Customer reviews
          </Typography>
          <Grid container spacing={{xs: 9, md: 20}}>
            <Rating />
            <Descriptions />
          </Grid>
        </Box>
      </ReviewProvider>
    </ScopedCssBaseline>
  )
}

export default CustomersReview
