import * as React from 'react'

import {SkuList, EmailField, ImageFormat, Recaptcha, SubmitRequest} from './components'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function ImageRequestForm() {
  //This object is the same as the body for api request
  const reviewData = React.useRef({
    sku_list: '',
    image_format: 'PNG',
    email: '',
    recaptcha: '',
  })

  //This handler is used for changing data in child components
  const changeHandler = (key, value) => {
    reviewData.current[key] = value
  }

  const value = {
    changeHandler,
    data: reviewData.current,
  }

  return (
    <Box>
      <Box
        sx={{
          '&': {
            maxWidth: 800,
            margin: '0 auto',
            minHeight: '70vh',
          },
        }}
      >
        <Box mt={14} px={8}>
          <Typography variant={'h2'} mb={2}>
            Product Image request form
          </Typography>
          <EmailField {...value} />
          <SkuList {...value} />
          <ImageFormat {...value} />
          <Recaptcha {...value} />
          <SubmitRequest {...value} />
        </Box>
      </Box>
    </Box>
  )
}

export default ImageRequestForm
