import * as React from 'react'

// import {postProductReview} from 'services'

import {post} from 'utils'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import {Alert, Snackbar} from '@mui/material'

// TODO: move this function to services @ehsan
function postProductReview(data) {
  return post({endpoint: 'users/variant-image-requests/', data})
}

function SubmitRequest(props) {
  const [loading, setLoading] = React.useState(false)
  const [openSnackbar, setOpenSnackbar] = React.useState(false)

  const submitHandler = () => {
    setLoading(true)
    postProductReview(props.data)
      .then(res => {
        setLoading(false)
        setOpenSnackbar(true)
      })
      .catch(err => setLoading(false))
  }

  return (
    <Stack mt={16} mb={30} spacing={4} alignItems={'center'}>
      <Button
        variant={'contained'}
        sx={{minWidth: 310, padding: '16px 80px', borderRadius: 15}}
        onClick={submitHandler}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress sx={{color: 'white'}} size={20} thickness={6} />
        ) : (
          <Typography variant={'body4'}>SUBMIT THE REQUEST</Typography>
        )}
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        key={'bottom' + 'center'}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{width: '100%'}}>
          Your request has been sent successfully! Please check your email.
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default SubmitRequest
