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
      {props.tags.map((tag, i) => (
        <Box
          key={i}
          mt={2}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            alignItems: 'center',
            width: 60,
            maxWidth: 60,
            gap: 1,
          }}
        >
          <Image
            alt={tag.name}
            height="60"
            loading="lazy"
            src={tag.icon}
            width="60"
          />
          <Typography sx={{maxWidth: '100px'}} textAlign="center">
            {tag.name}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}
