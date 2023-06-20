import * as React from 'react'

import {
  ReviewRate,
  ReviewerInfo,
  Variants,
  ReviewBody,
  Recommendation,
  PhotoUpload,
  SubmitReview,
  Breadcrumb,
} from './components'

import Box from '@mui/material/Box'

function WriteReview() {
  const [base64Img, setBase64Img] = React.useState({})
  const [error, setError] = React.useState({
    username: {state: false, message: ''},
    email: {state: false, message: ''},
    score: {state: false, message: ''},
  })
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
    error,
    setError,
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
        <Breadcrumb />
        <Box
          sx={{
            '&': {
              maxWidth: 442,
              margin: '0 auto',
              paddingTop: '47.06%',
              width: '100%',
              backgroundImage: `url("/assets/review/logoWhite.png")`,
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
