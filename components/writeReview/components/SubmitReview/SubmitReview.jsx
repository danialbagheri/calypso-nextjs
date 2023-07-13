import * as React from 'react'

import {postProductReview, postReviewImage} from 'services'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import {Alert} from '@mui/material'
import {validateEmail} from 'utils'

function SubmitReview(props) {
  const [loading, setLoading] = React.useState(false)
  const [alertState, setAlertState] = React.useState({
    state: false,
    severity: 'success',
    message: 'Your review has been send successfully!',
  })
  const [btnDisable, setBtnDisable] = React.useState(false)

  const slug = React.useRef('')

  const fieldsConductHandler = data => {
    const fieldsError = {}

    //Check Customer name field
    if (!data.customer_name) {
      fieldsError.customer_name = {
        state: true,
        message: 'Please enter your name.',
      }
    }

    //Check Score field
    if (!data.score) {
      fieldsError.score = {
        state: true,
        message: 'Please select a star rating between 1 and 5.',
      }
    }

    //Check Email field
    if (!data.customer_email) {
      fieldsError.customer_email = {
        state: true,
        message: 'Please enter your email address.',
      }
    } else if (!validateEmail(data.customer_email)) {
      fieldsError.customer_email = {
        state: true,
        message: 'Please enter a valid email address.',
      }
    }

    //Check Title field
    if (!data.title) {
      fieldsError.title = {
        state: true,
        message: 'Please write a headline for your review.',
      }
    }

    props.setError({...fieldsError})

    if (Object.keys(fieldsError).length) {
      setAlertState({
        state: true,
        severity: 'error',
        message: (
          <>
            {Object.values(fieldsError).map((error, i) => (
              <Typography key={i}>{error.message}</Typography>
            ))}
          </>
        ),
      })
      return true
    }
    return false
  }

  const submitHandler = e => {
    e.preventDefault()
    // setLoading(true)

    //Finding out if there is a field empty or have errors.
    const errorState = fieldsConductHandler(props.data)

    if (!errorState) {
      setBtnDisable(true)
      const promisesList = []
      Object.values(props.base64Img).forEach(base64_img =>
        promisesList.push(postReviewImage(base64_img)),
      )
      Promise.all(promisesList)
        .then(imgArray => {
          const imagesId = []
          imgArray.forEach(img => imagesId.push(img.id))
          return imagesId
        })
        .then(idArr => {
          props.changeHandler('image_ids', idArr)
        })
        .then(() => {
          postProductReview(props.data, slug.current)
        })
        .then(() => {
          setLoading(false)

          setAlertState({
            state: true,
            severity: 'success',
            message: 'Your review has been send successfully!',
          })
        })
        .catch(err => {
          setBtnDisable(false)
          setAlertState({
            state: true,
            severity: 'error',
            message: err || 'Something went wrong! please try later.',
          })
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    slug.current = window.location.search.split('=')[1]
  }, [])

  return (
    <Stack alignItems={'center'} mb={30} mt={16} spacing={4}>
      <Typography
        color={'primary'}
        sx={{width: '100%'}}
        textAlign={'center'}
        variant={'body3'}
      >
        Ready to share your experience?
      </Typography>
      <Button
        disabled={btnDisable}
        loading={loading}
        onClick={e => submitHandler(e)}
        sx={{
          minWidth: 310,
          padding: '16px',
          borderRadius: 15,
          color: 'white',

          boxShadow: 'unset',
          '&:hover': {
            backgroundColor: 'primary.main',
            boxShadow: 'unset',
          },
          '& span': {
            fontSize: '16px',
            fontWeight: '700',
          },
        }}
        variant={'contained'}
      >
        {loading ? (
          <CircularProgress size={20} sx={{color: 'white'}} thickness={6} />
        ) : (
          <Typography variant={'body4'}>SUBMIT THE REVIEW</Typography>
        )}
      </Button>
      {alertState.state ? (
        <Alert
          onClose={() => setAlertState(prev => ({...prev, state: false}))}
          severity={alertState.severity}
          sx={{width: '100%'}}
        >
          {alertState.message}
        </Alert>
      ) : null}
    </Stack>
  )
}

export default SubmitReview
