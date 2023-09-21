import {Button} from '@mui/base'
import {
  Alert,
  Box,
  CircularProgress,
  Collapse,
  Snackbar,
  TextField,
} from '@mui/material'
import * as React from 'react'
import {registerContact} from 'services'

function SubscribeForm() {
  const SUBSCRIPTION_STATE = 'subscriptionState'
  const SIGNED_UP = 'signedUp'

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
  const [showFields, setShowFields] = React.useState(false)

  const fieldStyle = {
    borderRadius: 1,
    width: '100%',

    '&>p.Mui-error': {
      marginTop: '0',
      marginBottom: '-6px',
      color: '#333',
      //   textShadow: '1px 1px 2px #d32f2f, 0 0 1em #d32f2f, 0 0 0.2em #d32f2f',
    },
    '& input': {padding: '5px', backgroundColor: 'white', borderRadius: 1},
    '&>label': {
      top: '-11px',
      color: '#222',
      textShadow: '1px 1px 4px white, 1px 1px 1em white, -2px -2px 0.2em white',
    },
    '&>label.MuiFormLabel-filled': {top: 0},
    '&>label.Mui-focused': {
      top: 0,
      color: '#222',
      textShadow: '1px 1px 4px white, 1px 1px 1em white, -2px -2px 0.2em white',
    },
    '&>.Mui-focused>fieldset': {
      borderColor: '#333 !important',
    },
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
    registerContact(data).then(res => {
      if (res.status < 400) {
        localStorage.setItem(SUBSCRIPTION_STATE, SIGNED_UP)
        setLoading(false)
        setApiResponse({
          message: <span>Thank you for subscribing &#128522;</span>,
          success: true,
        })
        setSnackBarOpen(true)
        setTimeout(() => setShowFields(false), 2000)
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
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flexGrow: 1,
          maxWidth: '220px',
        }}
      >
        {' '}
        <Collapse
          in={showFields}
          orientation="vertical"
          sx={{flexGrow: 1, '& .MuiCollapse-wrapperInner': {width: '100%'}}}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              width: '100%',
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
          </Box>
        </Collapse>
        <TextField
          error={error}
          helperText={error}
          id="outlined-required"
          label="Email address"
          onChange={e => changeHandler('email', e.target.value)}
          onClick={() => setShowFields(true)}
          required
          sx={{...fieldStyle}}
          type="email"
          value={fieldData.email}
        />
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '&>button': {
              border: 'none',
              padding: '4px 20px',
              background: '#f5af3f',
              borderRadius: 1,
              width: '120px',
              height: '28px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          }}
        >
          <Button
            onClick={e => submitHandler(e)}
            sx={{border: 'none'}}
            variant="contained"
          >
            {loading ? <CircularProgress size={23} /> : 'SUBSCRIBE'}
          </Button>
        </Box>
      </Box>
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

export default SubscribeForm
