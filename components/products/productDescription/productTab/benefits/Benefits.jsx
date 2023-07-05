import Image from 'next/image'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {Stack} from '@mui/material'

export default function Benefits(props) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        p: 2,
      }}
    >
      {props.tags.map((tag, i) => (
        <Stack
          alignItems={'center'}
          direction={'row'}
          gap={3}
          justifyContent={'flex-start'}
          key={i}
          mt={2}
          sx={{
            width: '100%',
          }}
        >
          <Image
            alt={tag.name}
            height="60"
            loading="lazy"
            src={tag.svg_icon || tag.icon || ''}
            width="60"
          />
          <Typography sx={{maxWidth: '100px', width: '100%'}}>
            {tag.name}
          </Typography>
        </Stack>
      ))}
    </Box>
  )
}
