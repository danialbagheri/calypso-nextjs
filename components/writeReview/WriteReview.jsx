import * as React from 'react'

import reviewImage from 'public/assets/review/logoWhite.png'
import {
  ReviewRate,
  ReviewerInfo,
  Variants,
  ReviewBody,
  Recommendation,
  PhotoUpload,
  SubmitReview,
} from './components'

import Box from '@mui/material/Box'

function WriteReview() {
  const [base64Img, setBase64Img] = React.useState({})
  //This object is the same as the body for api request
  const reviewData = React.useRef({
    username: '',
    email: '',
    location: '',
    title: '',
    comment: '',
    score: 0,
    variant: '',
    answers: [],
    image_ids: [],
  })

  //This handler is used for changing data in child components
  const changeHandler = (key, value) => {
    reviewData.current[key] = value
  }

  const value = {
    changeHandler,
    data: reviewData.current,
    setBase64Img,
    base64Img,
  }

  return (
    <Box>
      <Box
        sx={{
          '&': {
            maxWidth: 700,
            margin: '0 auto',
          },
        }}
      >
        <Box
          sx={{
            '&': {
              maxWidth: 442,
              margin: '0 auto',
              paddingTop: '47.06%',
              width: '100%',
              backgroundImage: `url("${reviewImage}")`,
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            },
          }}
        />
        <Box mt={20} px={11}>
          <ReviewerInfo {...value} />
          <Variants {...value} />
          <ReviewRate {...value} />
          <ReviewBody {...value} />
          {/*<Recommendation {...value} />*/}
          <PhotoUpload {...value} />
          <SubmitReview {...value} />
        </Box>
      </Box>
    </Box>
  )
}

export default WriteReview
