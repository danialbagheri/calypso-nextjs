import * as React from 'react'

import {postProductReview, postReviewImage} from 'services'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import {Alert, Snackbar} from '@mui/material'
import {validateEmail} from 'utils'

function SubmitReview(props) {
  const [loading, setLoading] = React.useState(false)
  const [snackBarState, setSnackBarState] = React.useState({
    state: false,
    severity: 'success',
    message: 'Your review has been send successfully!',
  })
  const slug = React.useRef('')

  const fieldsConductHandler = data => {
    const fieldsError = {}
    if (!data.username) {
      fieldsError.username = {
        state: true,
        message: 'Please enter your name.',
      }
    }
    if (!data.score) {
      fieldsError.score = {
        state: true,
        message: 'Please select a star rating between 1 and 5.',
      }
    }
    if (!data.email) {
      fieldsError.email = {
        state: true,
        message: 'Please enter your email address.',
      }
    } else if (!validateEmail(data.email)) {
      fieldsError.email = {
        state: true,
        message: 'Please enter a valid email address.',
      }
    }

    props.setError({...fieldsError})

    if (Object.keys(fieldsError).length) {
      setSnackBarState({
        state: true,
        severity: 'error',
        message: (
          <>
            {Object.values(fieldsError).map(error => (
              <Typography>{error.message}</Typography>
            ))}
          </>
        ),
      })
      return true
    } else return false
  }

  const submitHandler = () => {
    setLoading(true)

    const errorState = fieldsConductHandler(props.data)
    if (!errorState) {
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
        .then(() => postProductReview(props.data, slug.current))
        .then(() => {
          setLoading(false)
          setSnackBarState({
            state: true,
            severity: 'success',
            message: 'Your review has been send successfully!',
          })
        })
        .catch(err => setLoading(false))
    } else {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    slug.current = window.location.search.split('=')[1]
  }, [])

  return (
    <Stack mt={16} mb={30} spacing={4} alignItems={'center'}>
      <Typography
        sx={{width: '100%'}}
        variant={'body3'}
        color={'primary'}
        textAlign={'center'}
      >
        Ready to share your experience?
      </Typography>
      <Button
        variant={'contained'}
        sx={{minWidth: 310, padding: '16px 80px', borderRadius: 15}}
        onClick={submitHandler}
        loading={loading}
      >
        {loading ? (
          <CircularProgress sx={{color: 'white'}} size={20} thickness={6} />
        ) : (
          <Typography variant={'body4'}>SUBMIT THE REVIEW</Typography>
        )}
      </Button>

      <Snackbar
        open={snackBarState.state}
        autoHideDuration={5000}
        onClose={() => setSnackBarState(prev => ({...prev, state: false}))}
        key={'bottom' + 'center'}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert
          onClose={() => setSnackBarState(prev => ({...prev, state: false}))}
          severity={snackBarState.severity}
          sx={{width: '100%'}}
        >
          {snackBarState.message}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default SubmitReview
