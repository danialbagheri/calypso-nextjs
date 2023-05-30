import {Button} from '@mui/base'
import {Alert, Box, CircularProgress, Snackbar, TextField} from '@mui/material'
import * as React from 'react'
import {registerContact} from 'services'

function SubscribeForm() {
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
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flexGrow: 1,
          maxWidth: '300px',
          '& button': {
            background: '#f5af3f',
          },
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
        <Button variant="contained" onClick={e => submitHandler(e)}>
          {loading ? <CircularProgress size={23} /> : 'SUBSCRIBE'}
        </Button>
      </Box>
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

export default SubscribeForm
