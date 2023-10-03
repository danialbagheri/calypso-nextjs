import {Box, Typography} from '@mui/material'
import Image from 'next/image'

const DATA = [
  {alt: 'Closer Magazine', src: '/asSeenLogo/closerlogo.png'},
  {alt: 'Best', src: '/asSeenLogo/bestlogo.png'},
  {alt: 'Daily Record', src: '/asSeenLogo/dailyrecordlogo.png'},
  {alt: 'Evening Stand', src: '/asSeenLogo/eveningstandardlogo.png'},
  {alt: 'Metro', src: '/asSeenLogo/metrologo.png'},
  {alt: 'RealPeople Magazine', src: '/asSeenLogo/realpeoplelogo.png'},
  {alt: 'Reveal', src: '/asSeenLogo/reveallogo.png'},
  {alt: 'Woman Magazine', src: '/asSeenLogo/womanlogo.png'},
]

function AsSeen() {
  return (
    <Box className="row" sx={{maxWidth: '100%', mt: '50px', mb: '4rem'}}>
      <Typography textAlign={'center'} variant="h2">
        As seen in
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          flexWrap: 'wrap',
          maxWidth: 'min(900px , 90%)',
          mx: 'auto',
          my: 25,
        }}
      >
        {DATA.map(_data => (
          <Box
            key={_data.alt}
            sx={{width: 150, height: 70, position: 'relative', mx: 'auto'}}
          >
            <Image
              alt={_data.alt}
              fill
              src={_data.src}
              style={{objectFit: 'contain'}}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default AsSeen
