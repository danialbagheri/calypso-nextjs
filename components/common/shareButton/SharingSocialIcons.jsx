import React from 'react'
import {useRouter} from 'next/router'
import {Box, IconButton, Link} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import TwitterIcon from '@mui/icons-material/Twitter'
import PinterestIcon from '@mui/icons-material/Pinterest'
import AlternateEmailRoundedIcon from '@mui/icons-material/AlternateEmailRounded'

export default function SharingSocialIcons(props) {
  const {showSharingIcons, text, media} = props
  const [, setUriMedia] = React.useState('')
  const router = useRouter()

  React.useEffect(() => {
    const uri = encodeURI(media)
    setUriMedia(uri)
  })

  const shareUrls = {
    twitter: 'https://x.com/intent/tweet?source=',
    facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
    pinterest: 'http://pinterest.com/pin/create/button/?url=',
    tumblr: 'http://www.tumblr.com/share?v=3&u=',
    location: 'https://calypsosun.com',
  }

  const locationUrl = shareUrls.location + router.asPath

  const shareUrlsWithParams = {
    twitter:
      shareUrls.twitter +
      locationUrl +
      '&text=' +
      text +
      ` ${locationUrl}` +
      '&via=calypsosuncare',
    facebook: shareUrls.facebook + locationUrl + '&quote=' + text,
    pinterest:
      shareUrls.pinterest +
      locationUrl +
      '&media=' +
      encodeURI(media) +
      '&description=' +
      text,
    tumblr: shareUrls.tumblr + locationUrl + '&quote=' + text + '&s=',
    mailto: 'mailto:?subject=' + text + '&body=' + locationUrl,
  }

  return (
    <Box>
      <Link href={shareUrlsWithParams.mailto} target="_blank">
        <IconButton color="primary">
          <AlternateEmailRoundedIcon />
        </IconButton>
      </Link>
      <Link href={shareUrlsWithParams.pinterest} target="_blank">
        <IconButton color="primary">
          <PinterestIcon />
        </IconButton>
      </Link>
      <Link href={shareUrlsWithParams.twitter} target="_blank">
        <IconButton color="primary">
          <TwitterIcon />
        </IconButton>
      </Link>
      <Link href={shareUrlsWithParams.facebook} target="_blank">
        <IconButton color="primary">
          <FacebookRoundedIcon />
        </IconButton>
      </Link>
      <IconButton color="primary" onClick={showSharingIcons}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}
