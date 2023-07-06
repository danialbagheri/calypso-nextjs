import * as React from 'react'
import Image from 'next/image'
import Styles from './MailChimp.module.css'
import {
  Alert,
  Box,
  Snackbar,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import {registerContact} from 'services'
import Link from 'next/link'

export default function MailjetSignUp() {
  const SUBSCRIPTION_STATE = 'subscriptionState'
  const SUB_PANEL_OPEN = 'sub panel open'
  const SIGNED_UP = 'signedUp'

  const [showPopUp, setShowPopUp] = React.useState(false)
  const [fieldData, setFieldData] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
  })
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [apiResponse, setApiResponse] = React.useState({
    success: true,
    message: '',
  })
  const [snackBarOpen, setSnackBarOpen] = React.useState(false)

  const theme = useTheme()

  const subPanelOpenState = localStorage.getItem(SUB_PANEL_OPEN)

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

  /* -------------------------------- Function -------------------------------- */
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
      setError('Email is required.')
      return
    } else if (!emailValidator(fieldData.email)) {
      setError('Please enter a correct email address.')
      return
    }
    setLoading(true)
    setError('')
    const data = {
      firstName: fieldData.firstName,
      lastName: fieldData.lastName,
      email: fieldData.email,
    }
    registerContact(data)
      .then(res => {
        if (res.status < 400) {
          localStorage.setItem(SUBSCRIPTION_STATE, SIGNED_UP)
          setLoading(false)
          setApiResponse({
            message: <span>Thank you for subscribing &#128522;</span>,
            success: true,
          })
          setSnackBarOpen(true)
          setTimeout(() => setShowPopUp(false), 2000)
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
      .catch(err => {
        setLoading(false)
        setApiResponse({
          message: err,
          success: false,
        })
        setSnackBarOpen(true)
        setError(err)
      })
  }

  const onScroll = () => {
    const {pageYOffset} = window
    if (pageYOffset > 1000 && subPanelOpenState !== 'open') {
      window.removeEventListener('scroll', onScroll, {passive: true})
      setShowPopUp(true)
      localStorage.setItem(SUB_PANEL_OPEN, 'open')
    }
  }
  /* -------------------------------------------------------------------------- */

  React.useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && showPopUp) {
        setShowPopUp(false)
      }
    })

    if (subPanelOpenState !== 'open') {
      //add eventlistener to window
      window.addEventListener('scroll', onScroll, {passive: true})
      // remove event on unmount to prevent a memory leak with the cleanup
      return () => {
        window.removeEventListener('scroll', onScroll, {passive: true})
      }
    }
  }, [])

  return (
    <>
      <Box
        onClick={() => setShowPopUp(false)}
        sx={{
          display: showPopUp ? 'block' : 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          background: theme.palette.sand.main,
          zIndex: 50,
          transition: 'all 1s',
          opacity: 0.6,
        }}
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
          <div className={Styles.ImageContainer}>
            <Image
              alt={'subscription'}
              fill
              src={'/home-page/calypso-newsletter-subscription.jpg'}
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
            backgroundColor: '#fdf8f1c7',
          }}
        >
          <Typography textAlign={'center'} variant="h5">
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
                gap: '10px',
                flexGrow: 1,
              }}
            >
              <TextField
                id="outlined"
                label="First Name"
                onChange={e => changeHandler('firstName', e.target.value)}
                sx={{...fieldStyle}}
                type="text"
                value={fieldData.firstName}
              />
              <TextField
                id="outlined"
                label="Last Name"
                onChange={e => changeHandler('lastName', e.target.value)}
                sx={{...fieldStyle}}
                type="text"
                value={fieldData.lastName}
              />
              <TextField
                error={error}
                helperText={error}
                id="outlined-required"
                label="Email"
                onChange={e => changeHandler('email', e.target.value)}
                required
                sx={{...fieldStyle}}
                type="email"
                value={fieldData.email}
              />
              <Button
                color="primary"
                onClick={e => submitHandler(e)}
                sx={{'&>span': {color: 'white'}}}
                variant="contained"
              >
                {loading ? <CircularProgress size={23} /> : 'SUBSCRIBE'}
              </Button>
            </Box>
          </Box>

          <p className={Styles.smallText}>
            By entering your email, you are opting in to receiving emails from
            Calypso. You can opt out anytime.
            <Link href={'/privacy-policy'}>Privacy policy</Link>
          </p>
        </Box>
      </div>
      <Snackbar
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        autoHideDuration={6000}
        onClose={handleClose}
        open={snackBarOpen}
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
