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
    <Stack mt={16} mb={30} spacing={4} alignItems={'center'}>
      {response?.status == 400 && (
        <Typography variant="body2" color="red">
          Following products SKU were incorrect
          <br />
          {response['invalid_sku_list']?.map(item => (
            <>
              {item}
              <br />
            </>
          ))}
        </Typography>
      )}
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
        autoHideDuration={10000}
        onClose={() => setOpenSnackbar(false)}
        key={'bottom' + 'center'}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
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
