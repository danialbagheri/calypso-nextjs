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
      if (error) setError({state: false, text: ''})
      postOutOfStockEmail(data)
        .then(response => {
          setLoading(false)
          setEmailSubmit(true)
        })
        .catch(err => {
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
    <Stack spacing={5} mb={3} sx={{backgroundColor: '#fde3d3', padding: 4}}>
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
            textAlign={'center'}
            sx={{typography: {xs: 'h6', md: 'h5'}}}
          >
            OUT OF STOCK
          </Typography>
          <Typography
            textAlign={'center'}
            sx={{typography: {xs: 'body4', md: 'h6'}}}
          >
            We will let you know when this product is available again!
          </Typography>
          <TextField
            error={error.state}
            sx={{
              '& fieldset': {border: 'none'},
              '&>.MuiInputBase-root': {
                backgroundColor: '#fff',
                paddingRight: 0,
                borderRadius: 3,
              },
            }}
            helperText={error.text}
            size={'small'}
            placeholder={'Enter your email'}
            value={email}
            onChange={e => changeHandler(e)}
            InputProps={{
              endAdornment: (
                <Button
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
                  onClick={e => submitHandler(e)}
                >
                  {loading ? <CircularProgress size={35} /> : 'Notify me!'}
                </Button>
              ),
            }}
          />
        </>
      )}
    </Stack>
  )
}

export default OutOfStock
