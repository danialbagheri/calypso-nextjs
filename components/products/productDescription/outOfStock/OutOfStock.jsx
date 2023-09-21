import * as React from 'react'

import {Button, CircularProgress, TextField, Typography} from '@mui/material'
import {Stack} from '@mui/system'
import {validateEmail} from 'utils'
import {postOutOfStockEmail} from 'services'

function OutOfStock(props) {
  const {selectedVariant} = props

  const [email, setEmail] = React.useState('')
  const [error, setError] = React.useState({state: false, text: ''})
  const [emailSubmit, setEmailSubmit] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const changeHandler = e => {
    e.preventDefault()

    setEmail(e.target.value)
  }

  const submitHandler = e => {
    e.preventDefault()

    if (validateEmail(email)) {
      setLoading(true)
      const data = {email, variant_id: selectedVariant.id}
      if (error) {
        setError({state: false, text: ''})
      }
      postOutOfStockEmail(data)
        .then(() => {
          setLoading(false)
          setEmailSubmit(true)
        })
        .catch(() => {
          setLoading(false)
          setError({
            state: true,
            text: 'Something went wrong, please try later.',
          })
        })
    } else {
      setError({state: true, text: 'Please enter a correct email address.'})
    }
  }

  return (
    <Stack mb={3} spacing={5} sx={{backgroundColor: '#FCF5EC', padding: 4}}>
      {emailSubmit ? (
        <>
          <Typography textAlign={'center'} variant="h3">
            THANK YOU!
          </Typography>
          <Typography textAlign={'center'} variant="h6">
            We will let you know when this product is available again!
          </Typography>
        </>
      ) : (
        <>
          {' '}
          <Typography
            sx={{typography: {xs: 'h6', md: 'h5'}}}
            textAlign={'center'}
          >
            OUT OF STOCK
          </Typography>
          <Typography
            sx={{typography: {xs: 'body4', md: 'h6'}}}
            textAlign={'center'}
          >
            We will let you know when this product is available again!
          </Typography>
          <TextField
            error={error.state}
            helperText={error.text}
            InputProps={{
              endAdornment: (
                <Button
                  onClick={e => submitHandler(e)}
                  sx={{
                    height: {xs: 40, sm: 50},
                    width: 150,
                    minWidth: {xs: 115, md: 150},
                    minHeight: {xs: 40, md: 50},
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: 16,
                    borderRadius: 3,
                    background: '#ec6b1d',
                    color: 'white',

                    '& .MuiCircularProgress-svg ': {
                      color: 'white',
                    },
                  }}
                  variant="contained"
                >
                  {loading ? <CircularProgress size={35} /> : 'Notify me!'}
                </Button>
              ),
            }}
            onChange={e => changeHandler(e)}
            placeholder={'Enter your email'}
            size={'small'}
            sx={{
              '& fieldset': {border: 'none'},
              '&>.MuiInputBase-root': {
                backgroundColor: '#fff',
                paddingRight: 0,
                borderRadius: 3,
              },
            }}
            value={email}
          />
        </>
      )}
    </Stack>
  )
}

export default OutOfStock
