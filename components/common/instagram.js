import {useEffect, useState} from 'react'

import {Box, Typography} from '@mui/material'
import Image from 'next/image'
import {getInstagramPhotos} from 'services'

export default function Instagram() {
  const [feeds, setFeeds] = useState([])
  const [thumbDetail, setThumbDetail] = useState({width: 186, count: 5})

  useEffect(() => {
    getInstagramPhotos().then(res => {
      setFeeds(res)
    })
  }, [])

  useEffect(() => {
    if (window) {
      const thumbnailWidthCalc = () => {
        const INITIAL_THUMB_WIDTH = 186
        const windowWidth = window.innerWidth
        const count = Math.floor(windowWidth / INITIAL_THUMB_WIDTH)
        const width = windowWidth / count
        setThumbDetail({width, count})
      }
      window.addEventListener('resize', thumbnailWidthCalc)
      thumbnailWidthCalc()
    }
  }, [])

  return (
    <Box mt={30}>
      <Typography color="primary.main" textAlign="center" variant="h2">
        #FindTheFeeling
      </Typography>
      <Typography mt={8} textAlign="center" variant="h3">
        Share your summer moments with us on Instagram.
      </Typography>
      <Box sx={{display: 'flex', mt: 5}}>
        {feeds.slice(0, thumbDetail.count).map(feed => (
          <Box
            bgcolor="primary.main"
            key={feed.id}
            onClick={() => window.open(feed.permalink, '_blank')}
            sx={{
              width: thumbDetail.width,
              height: thumbDetail.width,
              position: 'relative',
              transition: '500ms all',
              cursor: 'pointer',
              p: 5,
              overflow: 'hidden',
              '&:hover': {
                '&>img': {
                  display: 'none',
                },
              },
            }}
          >
            <Typography
              sx={{
                color: '#FFF',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 6,
                overflow: 'hidden',
              }}
            >
              {feed.caption}
            </Typography>
            <Image
              alt={feed.caption}
              fill
              src={feed.thumbnail}
              style={{objectFit: 'cover'}}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
