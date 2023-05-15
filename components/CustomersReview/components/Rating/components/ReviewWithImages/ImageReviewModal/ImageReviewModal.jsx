import * as React from 'react'

import Image from 'next/image'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Rating from '@mui/material/Rating'
import StarIcon from '@mui/icons-material/Star'
import {Typography, useTheme} from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  maxWidth: '90%',
  height: 600,
  backgroundColor: 'white',
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  padding: '12px 8px',
  paddingTop: 15,
  borderRadius: 3,
  overflow: {xs: 'scroll', md: 'hidden'},
  '&:focus-visible': {
    border: 'none',
  },
}

export default function ImageReviewModal({open, setOpen, data}) {
  const [mainImgSrc, setMainImgSrc] = React.useState({src: '', id: ''})
  const theme = useTheme()

  const handleClose = () => setOpen(false)

  const clickHandler = image => {
    setMainImgSrc({src: image.image, id: image.id})
  }

  React.useEffect(() => {
    if (data?.image.image) {
      setMainImgSrc({src: data.image.image, id: data.image.id})
    }
  }, [data])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{overflow: 'scroll'}}>
        {mainImgSrc ? (
          <Stack sx={style} direction={{sx: 'column', md: 'row'}} gap={3}>
            <Box
              sx={{
                backgroundColor: '#E5E5E5',
                height: 50,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  right: 3,
                  top: '50%',
                  cursor: 'pointer',
                  padding: 3,
                  fontSize: 20,
                  transform: 'translate(0,-50%)',
                  '&:hover': {
                    transition: 'all 300ms',
                    color: '#9e9e9e',
                  },
                }}
                onClick={() => {
                  handleClose()
                }}
              >
                <span>x</span>
              </Box>
            </Box>
            <Stack
              sx={{
                width: {sx: '100%'},
                overflow: {xs: 'unset', md: 'scroll'},
                minWidth: '50%',
                minHeight: {xs: 'auto', md: '150px'},
              }}
              direction={'column'}
              gap={4}
            >
              <Box>
                <Image
                  src={mainImgSrc.src}
                  layout="responsive"
                  objectFit="contain"
                  width="100%"
                  height="100%"
                />
              </Box>
              <Typography variant={'h6'} sx={{marginBottom: -2}}>
                Images in this review
              </Typography>
              <Stack direction={'row'} flexWrap={'wrap'} gap={3}>
                {data.review.images.map((image, i) => (
                  <Box
                    sx={{
                      cursor: 'pointer',
                      width: '85px',
                      height: '100px',

                      borderRadius: 1,
                      backgroundImage: `url(${image.image})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      border: '3px solid',
                      borderColor:
                        mainImgSrc.id === image.id
                          ? theme.palette.primary.main
                          : 'transparent',
                      transition: 'all 200ms',
                      boxSizing: 'border-box',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                      },
                    }}
                    key={i}
                    onClick={() => {
                      clickHandler(image)
                    }}
                  />
                ))}
              </Stack>
            </Stack>
            <Stack direction={'column'} gap={2}>
              <Typography variant={'h3'}>
                {data.review.customer_name}
              </Typography>
              <Typography variant={'h5'}>{data.review.title}</Typography>
              <Rating
                sx={{
                  '& .MuiRating-icon': {
                    color: theme.palette.golden.main,
                  },
                }}
                defaultValue={data.review.score}
                readOnly
                emptyIcon={<StarIcon color={'grey'} fontSize="inherit" />}
              />
              <Typography variant={'body3'}>{data.review.comment}</Typography>
            </Stack>
          </Stack>
        ) : null}
      </Box>
    </Modal>
  )
}
