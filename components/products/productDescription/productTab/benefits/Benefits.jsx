import Image from 'next/image'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function Benefits(props) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: 12,
        p: 2,
      }}
    >
      {props.tags.map(tag => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
            width: 60,
            maxWidth: 60,
            gap: 1,
          }}
          mt={2}
        >
          <Image
            src={tag.icon}
            alt={tag.name}
            loading="lazy"
            width="60"
            height="60"
          />
          <Typography textAlign="center" sx={{maxWidth: '100px'}}>
            {tag.name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
