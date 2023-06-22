import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import {useTheme} from '@mui/material'

function validateEmail(input) {
  // const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const validRegex = /^[a-z0-9](\.?[a-z0-9]){5,}@lincocare\.com$/

  return validRegex.test(input)
}

function EmailField(props) {
  //constants
  const EMAIL = 'email'

  const [userData, setUserData] = React.useState({
    [EMAIL]: {value: '', errorState: false, errorText: ''},
  })
  const theme = useTheme()

  const field = {
    id: EMAIL,
    type: EMAIL,
    placeholder: 'smith@lincocare.com',
    label: 'Email address',
    mode: 'email',
  }

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
    //Control if the email address is correct or not
    if (type === EMAIL) {
      if (!validateEmail(value.toLowerCase())) {
        setUserData(prev => ({
          ...prev,
          [type]: {
            ...prev[type],
            errorState: true,
            errorText: 'Please Enter a valid Linco Care email address',
          },
        }))
      } else if (userData[type].errorState) {
        setUserData(prev => ({
          ...prev,
          [type]: {...prev[type], errorState: false, errorText: ''},
        }))
      }
    }
  }

  return (
    <Box key={field.id}>
      <Typography mb={2} variant={'h6'}>
        {field.label}
      </Typography>
      <TextField
        controls={true}
        error={userData[field.type].errorState}
        helperText={userData[field.type].errorText}
        inputMode={field.mode}
        onBlur={e => onBlurHandler(field.type, e.target.value)}
        onChange={e => inputHandler(e, field.type)}
        placeholder={field.placeholder}
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
        value={userData[field.type].value}
      />
    </Box>
  )
}

export default EmailField
