import * as React from 'react'

import {
  EmailField,
  ImageFormat,
  Recaptcha,
  SelectOptionsInput,
  SkuList,
  SubmitRequest,
} from './components'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function ImageRequestForm() {
  //This object is the same as the body for api request
  const reviewData = React.useRef({
    sku_list: '',
    image_format: 'PNG',
    image_type: 'PI',
    image_angle: 'FRONT',
    email: '',
    recaptcha: '',
  })

  const imageTypeOptions = {
    PI: 'Product Image',
    LS: 'Life Style',
    RP: 'Range Photo',
    TX: 'Texture',
    AN: 'Animation',
    ST: 'Studio',
    RS: 'Result',
    OT: 'Others',
  }

  const ImageAngleOptions = {
    FRONT: 'Front',
    BACK: 'Back',
    ANGLE: 'Angle',
    TOP: 'Top',
    'RIGHT-SIDE': 'Right Side',
    'LEFT-SIDE': 'Left Side',
    BOTTOM: 'Bottom',
    CUSTOM: 'Custom',
  }

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
          <Typography mb={2} variant={'h2'}>
            Product Image request form
          </Typography>
          <EmailField {...value} />
          <SkuList {...value} />
          <ImageFormat {...value} />
          <SelectOptionsInput
            fieldName={'image_type'}
            label={'Image Type'}
            options={imageTypeOptions}
            {...value}
          />
          <SelectOptionsInput
            fieldName={'image_angle'}
            label={'Image Angle'}
            options={ImageAngleOptions}
            {...value}
          />
          <Recaptcha {...value} />
          <SubmitRequest {...value} />
        </Box>
      </Box>
    </Box>
  )
}

export default ImageRequestForm
