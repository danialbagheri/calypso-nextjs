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
      <Typography variant={'h3'} textAlign={'center'}>
        Overall rating
      </Typography>
      <Box textAlign={'center'} mt={3}>
        <Rating
          name="size-large"
          value={rate}
          size="large"
          onChange={e => ratingHandler(e)}
        />
      </Box>
    </Box>
  )
}

export default ReviewRate
