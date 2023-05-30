import * as React from 'react'
import Image from 'next/image'
import Styles from './MailChimp.module.css'
import {Alert, Box, Snackbar, TextField, Typography} from '@mui/material'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import {registerContact} from 'services'

export default function MailjetSignUp() {
  const [showPopUp, setShowPopUp] = React.useState(false)
  const [fieldData, setFieldData] = React.useState({
    email: '',
    name: '',
    lastName: '',
  })
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [apiResponse, setApiResponse] = React.useState({
    success: true,
    message: '',
  })
  const [snackBarOpen, setSnackBarOpen] = React.useState(false)

  const fieldStyle = {
    width: '100%',
    '&>p': {marginTop: '-2px', marginBottom: '-6px'},
    '& input': {padding: '5px'},
    '&>label': {top: '-11px'},
    '&>label.MuiFormLabel-filled': {top: 0},
    '&>label.Mui-focused': {
      top: 0,
      color: '#fb4c1e',
    },
    '&>.Mui-focused>fieldset': {
      borderColor: '#fb4c1e80 !important',
    },
  }

  const setShowPopUpSetting = () => {
    setShowPopUp(!showPopUp)
  }

  const emailValidator = value =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)

  const changeHandler = (type, value) => {
    setFieldData(prev => ({...prev, [type]: value}))
  }

  const handleClose = () => {
    setSnackBarOpen(false)
  }

  const submitHandler = e => {
    e.preventDefault()
    if (!fieldData.email) {
      setError('This field is required!')
      return
    } else if (!emailValidator(fieldData.email)) {
      setError('The Email format is not correct!')
      return
    } else {
      setLoading(true)
      setError('')
      const data = {
        name: `${fieldData.name} ${fieldData.lastName}`,
        email: fieldData.email,
      }
      registerContact(data).then(res => {
        if (res.status < 400) {
          setLoading(false)
          setApiResponse({
            message: 'You have subscribed successfully!',
            success: true,
          })
          setSnackBarOpen(true)
        } else {
          res.json().then(res => {
            setLoading(false)
            setApiResponse({
              message: res.message,
              success: false,
            })
            setSnackBarOpen(true)
            if (res.message.includes('Email already exists')) {
              setError('This email address already exists!')
            }
          })
        }
      })
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && showPopUp) {
        setShowPopUp(false)
      }
    })
  }, [])

  return (
    <>
      <Box
        sx={{
          display: showPopUp ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 50,
          transition: 'all 1s',
        }}
        onClick={() => setShowPopUp(false)}
      />

      <div
        className={`${Styles.NewsLetterContainer} ${
          showPopUp
            ? Styles.NewsLetterContainerOpen
            : Styles.NewsLetterContainerClose
        }`}
      >
        <div
          className={Styles.OfferContainer}
          onClick={e => {
            e.stopPropagation()
            setShowPopUpSetting()
          }}
        >
          <i className={Styles.ToggleIcon} />
          <div className={Styles.Offer}>
            <span>GET 10% OFF</span>
          </div>
        </div>

        <div className={Styles.Content}>
          <div
            className={Styles.ImageContainer}
            // onClick={() => setShowPopUpSetting()}
          >
            <Image
              src={'/home-page/calypso-newsletter-subscription.jpg'}
              fill
              style={{objectFit: 'cover'}}
            />
          </div>
        </div>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Typography variant="h5" textAlign={'center'}>
            Sign up to get 10% off your first order
          </Typography>
          <Box className={Styles.infoContainer}>
            <Box mt={'-10px'} sx={{flexGrow: 1}}>
              <ul>
                <li>Exclusive offers</li>
                <li>New product launches</li>
                <li>Sun advice</li>
              </ul>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '7px',
                flexGrow: 1,
              }}
            >
              <TextField
                required
                id="outlined-required"
                label="Email address"
                type="email"
                sx={{...fieldStyle}}
                value={fieldData.email}
                onChange={e => changeHandler('email', e.target.value)}
                helperText={error}
                error={error}
              />
              <TextField
                id="outlined"
                label="Name"
                type="text"
                sx={{...fieldStyle}}
                value={fieldData.name}
                onChange={e => changeHandler('name', e.target.value)}
              />
              <TextField
                id="outlined"
                label="Last name"
                type="text"
                sx={{...fieldStyle}}
                value={fieldData.lastName}
                onChange={e => changeHandler('lastName', e.target.value)}
              />
              <Button
                color="primary"
                variant="contained"
                onClick={e => submitHandler(e)}
                sx={{'&>span': {color: 'white'}}}
              >
                {loading ? <CircularProgress size={23} /> : 'SUBSCRIBE'}
              </Button>
            </Box>
          </Box>

          <p className={Styles.smallText}>
            By entering your email, you are opting in to receiving emails from
            Calypso. You can opt out anytime. Privacy policy
          </p>
        </Box>
      </div>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        <Alert
          onClose={handleClose}
          severity={apiResponse.success ? 'success' : 'error'}
          sx={{width: '100%'}}
        >
          {apiResponse.message}
        </Alert>
      </Snackbar>
    </>
  )
}
