import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTruck} from '@fortawesome/free-solid-svg-icons'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import {Typography} from '@mui/material'

function DeliveryInfo() {
  return (
    <Box mt={4}>
      <Stack alignItems="center" direction={'row'} gap={2}>
        <FontAwesomeIcon className="calypso-orange-text" icon={faTruck} />
        <Typography>Buy 2 or more products for</Typography>
        <strong>Free UK Delivery</strong>
      </Stack>
      <div style={{textAlign: 'left'}}>
        <span style={{color: 'grey'}}>Standard UK delivery £3</span>
      </div>
    </Box>
  )
}

export default DeliveryInfo
