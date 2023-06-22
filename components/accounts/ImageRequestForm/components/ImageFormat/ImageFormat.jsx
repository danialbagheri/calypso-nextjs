import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {useTheme} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

function ImageFormat(props) {
  //constants
  const IMAGE_FORMAT = 'image_format'
  const [metaData, setMetaData] = React.useState({
    [IMAGE_FORMAT]: {value: 'PNG', errorState: false, errorText: ''},
  })
  const theme = useTheme()

  const field = {
    id: IMAGE_FORMAT,
    type: IMAGE_FORMAT,
  }

  const inputHandler = e => {
    e.preventDefault()
    //This function is used to change api data which is needed in POST method
    props.changeHandler(field.type, e.target.value)

    //It is recommended to use controlled variables in react so here we used "useState"
    setMetaData(prev => ({
      ...prev,
      [field.type]: {...prev[field.type], value: e.target.value},
    }))
  }

  return (
    <Box key={field.id} sx={{mt: 2}}>
      <Typography mb={2} variant={'h6'}>
        Image Format
      </Typography>
      <Select
        id="demo-simple-select"
        label="image_format"
        labelId="image-fomrat-select"
        onChange={e => inputHandler(e)}
        sx={{
          '&': {
            '.MuiInputBase-root': {borderRadius: 20},
            input: {
              color: theme.palette.primary.main,
              ...theme.typography.body4,
              padding: '10px 15px',
            },
            width: '100%',
          },
        }}
        value={metaData[field.type].value}
      >
        <MenuItem value={'PNG'}>PNG</MenuItem>
        <MenuItem value={'JPG'}>JPEG</MenuItem>
      </Select>
    </Box>
  )
}

export default ImageFormat
