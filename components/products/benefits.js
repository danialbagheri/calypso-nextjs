import Image from 'next/image'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Benefits(props) {
  const {benefits} = props

  return (
    <Box
      sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}
    >
      {benefits.map(benefit => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          mt={2}
        >
          <Image
            src={benefit.icon}
            alt={benefit.name}
            loading="lazy"
            width="68"
            height="68"
          />
          <Typography mt={2} textAlign="center" sx={{maxWidth: '100px'}}>
            {benefit.name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
