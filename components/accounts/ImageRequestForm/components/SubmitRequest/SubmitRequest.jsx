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
  const [response, setResponse] = React.useState({status: 200})
  const submitHandler = () => {
    setLoading(true)
    postProductReview(props.data)
      .then(res => {
        setLoading(false)
        setResponse(res)
        setOpenSnackbar(true)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <Stack alignItems={'center'} mb={30} mt={16} spacing={4}>
      {response?.status == 400 && (
        <Typography color="red" variant="body2">
          Following products SKU were incorrect
          <br />
          {response.invalid_sku_list?.map(item => (
            <>
              {item}
              <br />
            </>
          ))}
        </Typography>
      )}
      <Button
        disabled={loading}
        onClick={submitHandler}
        sx={{minWidth: 310, padding: '16px 80px', borderRadius: 15}}
        variant={'contained'}
      >
        {loading ? (
          <CircularProgress size={20} sx={{color: 'white'}} thickness={6} />
        ) : (
          <Typography variant={'body4'}>SUBMIT THE REQUEST</Typography>
        )}
      </Button>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={10000}
        key={'bottom' + 'center'}
        onClose={() => setOpenSnackbar(false)}
        open={openSnackbar}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={response?.status == 200 ? 'success' : 'error'}
          sx={{width: '100%'}}
        >
          Your request has been sent successfully! Please check your email.
          <br />
          {JSON.stringify(response, 0, 2)}
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default SubmitRequest
