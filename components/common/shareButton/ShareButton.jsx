import {useState} from 'react'

import ShareIcon from '@mui/icons-material/Share'
import {Box, IconButton, Typography} from '@mui/material'

import SharingSocialIcons from './SharingSocialIcons'

export default function ShareButton({text, media}) {
  const [displayIcon, setDisplayIcon] = useState(false)

  function showSharingIcons() {
    setDisplayIcon(!displayIcon)
  }

  const icons =
    displayIcon === false ? (
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <IconButton onClick={showSharingIcons} color="primary">
          <ShareIcon />
        </IconButton>
        <Typography color="primary">Share</Typography>
      </Box>
    ) : (
      <SharingSocialIcons
        showSharingIcons={showSharingIcons}
        text={text}
        media={media}
      />
    )
  return <div>{icons}</div>
}
