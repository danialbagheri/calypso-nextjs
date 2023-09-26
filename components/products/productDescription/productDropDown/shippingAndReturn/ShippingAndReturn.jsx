import {Box, Link, Typography} from '@mui/material'
export default function ShippingAndReturn() {
  return (
    <Box>
      <Typography>UK postage and packaging £4.50.</Typography>
      <Typography>Free 1 - 2 day shipping on all orders above £25.</Typography>
      <Typography sx={{mt: 4}}>
        We offer a 30 day return & refund policy with a 100% money back
        guarantee. For more details
        <Link href="/returns-policy"> see more.</Link>
      </Typography>
      <Typography sx={{mt: 4}}>
        {' '}
        Contact our customer service team,{' '}
        <Link href="/contact-us">click here.</Link>
      </Typography>
    </Box>
  )
}
