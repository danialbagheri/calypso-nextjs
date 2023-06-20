import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import {useTheme} from '@mui/material'
import {validateEmail} from 'utils'

function ReviewerInfo(props) {
  //constants
  const USERNAME = 'username'
  const EMAIL = 'email'
  const LOCATION = 'location'

  const [userData, setUserData] = React.useState({
    [USERNAME]: {value: '', errorState: false, errorText: ''},
    [EMAIL]: {value: '', errorState: false, errorText: ''},
    [LOCATION]: {value: '', errorState: false, errorText: ''},
  })
  const theme = useTheme()

  const fields = [
    {
      id: USERNAME,
      type: USERNAME,
      placeholder: 'Your Full Name',
      label: 'Full name',
      mode: 'text',
    },
    {
      id: EMAIL,
      type: EMAIL,
      placeholder: 'Your Email Address',
      label: 'Email address',
      mode: 'email',
    },
    {
      id: LOCATION,
      type: LOCATION,
      placeholder: 'Your City Or Country',
      label: 'Location',
      mode: 'text',
    },
  ]

  const inputHandler = (e, type) => {
    e.preventDefault()
    //This function is used to change api data which is needed in POST method
    //As this is a ref hook, so it's uncontrolled variable
    props.changeHandler(type, e.target.value)

    //It is recommended to use controlled variables in react so here we used "useState"
    setUserData(prev => ({
      ...prev,
      [type]: {...prev[type], value: e.target.value},
    }))
  }

  const onBlurHandler = (type, value) => {
    switch (type) {
      case USERNAME:
        if (!value) {
          setUserData(prev => ({
            ...prev,
            [type]: {
              ...prev[type],
              errorState: true,
              errorText: 'Please enter your name.',
            },
          }))
        } else if (userData[type].errorState) {
          setUserData(prev => ({
            ...prev,
            [type]: {
              ...prev[type],
              errorState: false,
              errorText: '',
            },
          }))
        }
        break
      case EMAIL:
        if (!value) {
          setUserData(prev => ({
            ...prev,
            [type]: {
              ...prev[type],
              errorState: true,
              errorText: 'Please enter your email address.',
            },
          }))
        } else if (!validateEmail(value)) {
          setUserData(prev => ({
            ...prev,
            [type]: {
              ...prev[type],
              errorState: true,
              errorText: 'Please enter a valid email address.',
            },
          }))
        } else if (userData[type].errorState) {
          setUserData(prev => ({
            ...prev,
            [type]: {
              ...prev[type],
              errorState: false,
              errorText: '',
            },
          }))
        }
        break
    }
  }

  return (
    <Stack mt={5} spacing={5}>
      <Typography variant={'h3'} textAlign={'center'}>
        Reviewer info
      </Typography>
      {fields.map(field => (
        <Box key={field.id}>
          <Typography variant={'h6'} mb={2}>
            {field.label}
          </Typography>
          <TextField
            controls={true}
            onChange={e => inputHandler(e, field.type)}
            inputMode={field.mode}
            value={userData[field.type].value}
            sx={{
              '&': {
                '.MuiInputBase-root': {borderRadius: 20},
                input: {
                  color: theme.palette.primary.main,
                  ...theme.typography.body4,
                  padding: '10px 15px',
                },
                width: '100%',
              },
            }}
            placeholder={field.placeholder}
            onBlur={e => onBlurHandler(field.type, e.target.value)}
            error={
              userData[field.type].errorState || props.error[field.type]?.state
            }
            helperText={
              userData[field.type].errorText ? (
                <Typography>{userData[field.type].errorText}</Typography>
              ) : (
                props.error[field.type]?.state && (
                  <Typography>{props.error[field.type]?.message}</Typography>
                )
              )
            }
          />
        </Box>
      ))}
    </Stack>
  )
}

export default ReviewerInfo
