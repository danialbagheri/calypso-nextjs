import {Box, Typography} from '@mui/material'

import Image from 'next/image'
import {useRouter} from 'next/router'

import blogCurve from 'public/blogCurve.svg'

function BlogImage(props) {
  const {item, index} = props
  const router = useRouter()

  const clickHandler = e => {
    e.preventDefault()
    router.push(`/advice/${item.slug}/`)
  }

  return (
    <Box
      onClick={e => clickHandler(e)}
      sx={{
        width: {xs: 280, ssm: 420, sm: 250, md: 280, lg: 420},
        position: 'relative',
        boxShadow: '0 2px 4px 0 rgba(193, 193, 193, 0.5)',
        borderRadius: '7px',
        overflow: 'hidden',
        marginBottom: 5,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: {xs: 250, ssm: 350, sm: 250, md: 280, lg: 350},
          background: '#ffffff',
        }}
      >
        <Image
          alt={item.image_alt_text}
          fill={true}
          loading="lazy"
          src={item.image}
          style={{objectFit: 'cover'}}
        />
      </Box>

      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          height: {xs: 120, ssm: 220, sm: 150, md: 120, lg: 150},
          bottom: 0,
          transform: index % 2 ? 'rotateY(180deg)' : null,
        }}
      >
        <Image fill={true} src={blogCurve} style={{objectFit: 'cover'}} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 5,
          padding: 3,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            textShadow:
              '-1px -3px 5px #fff ,1px -3px 4px #fff,1px 2px 4px #fff,1px 2px 4px #fff',
          }}
          textAlign={'center'}
          variant={{xs: 'h5', ssm: 'h4'}}
        >
          {item.title}
        </Typography>

        <Typography
          mt={1}
          onClick={e => clickHandler(e)}
          sx={{color: '#4daff6', cursor: 'pointer'}}
          textAlign={'center'}
        >
          Read More
        </Typography>
      </Box>
    </Box>
  )
}

export default BlogImage
