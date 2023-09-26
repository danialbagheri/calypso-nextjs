import {Box} from '@mui/material'
import Image from 'next/image'

export function Background(props) {
  const {infoMode} = props
  return (
    <Box sx={{position: 'relative'}}>
      <Box sx={{height: {xs: 112, md: 225}, bgcolor: '#ABD7FF'}} />
      <Box
        sx={{
          height: {xs: infoMode ? 53 : 12, md: 24},
          bgcolor: '#3CBFDC',
          position: 'relative',

          '&>img': {
            position: 'absolute',
          },

          '&>.bigBoat': {
            top: 0,
            left: '50%',
            transform: {
              xs: 'translate(-150px,-65%)',
              md: 'translate(-180px,-65%)',
            },
          },

          '&>.smallBoat': {
            top: 0,
            right: '50%',
            transform: {
              xs: 'translate(130px,-70%)',
              md: 'translate(160px,-70%)',
            },
          },
        }}
      >
        <Image
          alt="boat"
          className="bigBoat"
          height={38}
          src="/productFinder/boat.svg"
          width={27}
        />
        <Image
          alt="boat"
          className="smallBoat"
          height={16}
          src="/productFinder/boat.svg"
          width={13}
        />
      </Box>
    </Box>
  )
}
