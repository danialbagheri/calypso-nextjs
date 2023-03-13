import * as React from 'react'

import {postProductReview, postReviewImage} from 'services'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import {Alert, Snackbar} from '@mui/material'

function SubmitReview(props) {
  const [loading, setLoading] = React.useState(false)
  const [openSnackbar, setOpenSnackbar] = React.useState(false)
  const slug = React.useRef('')

  const submitHandler = () => {
    setLoading(true)
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
        setOpenSnackbar(true)
      })
      .catch(err => setLoading(false))
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
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        key={'bottom' + 'center'}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{width: '100%'}}
        >
          Your review has been send successfully!
        </Alert>
      </Snackbar>
    </Stack>
  )
}

export default SubmitReview
