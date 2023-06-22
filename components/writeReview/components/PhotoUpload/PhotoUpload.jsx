import * as React from 'react'

import {convertImageToBase64, createObjectURL} from 'utils'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import {useTheme} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

function PhotoUpload(props) {
  const [imagesData, setImageData] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const theme = useTheme()

  const imageSelectHandler = e => {
    setLoading(true)
    const newImageData = [...imagesData]
    const newBase64Data = {}
    const files = e.target.files

    for (let i = 0; i < files.length; i++) {
      convertImageToBase64(files[i])
        .then(bs => {
          const time = new Date().getTime()
          const id = +files[i].lastModified + i + time
          newImageData.push({
            id,
            name: files[i].name,
            url: createObjectURL(files[i]),
          })
          newBase64Data[id] = bs
        })
        .then(() => {
          setImageData(newImageData)
          props.setBase64Img(prev => ({...prev, ...newBase64Data}))
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    }
  }

  const removeHandler = id => {
    const newImageDataArr = imagesData.filter(img => img.id !== id)
    props.setBase64Img(prev => {
      const newObj = {...prev}
      delete newObj[id]
      return newObj
    })
    setImageData([...newImageDataArr])
  }

  return (
    <Stack mt={{xs: 12, md: 8}}>
      <Stack
        alignItems={{xs: 'flex-start', md: 'center'}}
        direction={{xs: 'column', md: 'row'}}
        justifyContent={'space-between'}
      >
        <Typography variant={'body3'}>
          Do you have any photo you would like to upload?
        </Typography>
        <Button
          component={'label'}
          startIcon={<PhotoCamera />}
          sx={{
            borderRadius: 13,
            padding: '12px 20px',
            marginTop: {
              xs: 5,
              md: 0,
            },
          }}
          variant="outlined"
        >
          <Typography variant={'body4'}>UPLOAD A PHOTO</Typography>
          <input
            accept="image/*"
            hidden
            multiple
            onChange={imageSelectHandler}
            style={{display: 'none'}}
            type="file"
          />
        </Button>
      </Stack>
      <Stack
        direction={'row'}
        justifyContent={{xs: 'flex-start', md: 'center'}}
        mt={imagesData.length && 4}
        sx={{flexWrap: 'wrap', gap: 4}}
      >
        {imagesData.map((img, i) => (
          <Box
            key={i}
            sx={{
              width: 150,
              height: 150,
              borderRadius: 2,
              backgroundImage: `url("${img.url}")`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              border: `2px solid ${theme.palette.primary.light}`,
            }}
          >
            <CloseIcon
              onClick={() => removeHandler(img.id)}
              sx={{
                position: 'absolute',
                right: 3,
                top: 3,
                backgroundColor: '#e2e2e2',
                borderRadius: '50%',
                fill: theme.palette.primary.light,
                cursor: 'pointer',
                transition: '700ms',
                '&:hover': {
                  transform: 'rotate(270deg)',
                  fill: theme.palette.primary.main,
                },
              }}
            />
          </Box>
        ))}
        {loading ? (
          <Box
            sx={{
              width: 150,
              height: 150,
              borderRadius: 2,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              border: `2px solid ${theme.palette.primary.light}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : null}
      </Stack>
    </Stack>
  )
}

export default PhotoUpload
