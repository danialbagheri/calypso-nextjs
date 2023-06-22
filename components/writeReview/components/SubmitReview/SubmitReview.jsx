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
    }
    return false
  }

  const submitHandler = e => {
    e.preventDefault()
    setLoading(true)

    //Finding out if there is a field empty or have errors.
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
        .catch(err => {
          setSnackBarState({
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
        disabled={!props.data.username || !props.data.email}
        loading={loading}
        onClick={e => submitHandler(e)}
        sx={{
          minWidth: 310,
          padding: '16px 80px',
          borderRadius: 15,
          color: 'white',

          boxShadow: 'unset',
          '&:hover': {
            backgroundColor: 'primary.main',
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

      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={5000}
        key={'bottom' + 'center'}
        onClose={() => setSnackBarState(prev => ({...prev, state: false}))}
        open={snackBarState.state}
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
