import * as React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'

function ReviewRate(props) {
  const [rate, setRate] = React.useState(0)

  const ratingHandler = e => {
    e.preventDefault()
    props.changeHandler('score', e.target.value)
    setRate(e.target.value)
  }

  return (
    <Box mt={15}>
      <Typography textAlign={'center'} variant={'h3'}>
        Overall rating
      </Typography>
      <Box mt={3} textAlign={'center'}>
        <Rating
          name="size-large"
          onChange={e => ratingHandler(e)}
          size="large"
          sx={{
            border: '1px solid',
            p: 2,
            borderRadius: 2,
            borderColor: props.error.score?.state ? '#d32f2f' : 'transparent',
          }}
          value={rate}
        />
      </Box>
      {props.error.score?.state ? (
        <Box sx={{pt: 4, color: '#d32f2f'}}>
          <Typography textAlign={'center'} variant="h6">
            {props.error.score?.message}
          </Typography>
        </Box>
      ) : null}
    </Box>
  )
}

export default ReviewRate
