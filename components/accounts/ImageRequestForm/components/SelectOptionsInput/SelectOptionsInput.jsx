import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {useTheme} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

function SelectOptionsInput(props) {
  const {fieldName, options, label, data} = props
  //constants
  const formFieldName = fieldName
  const [metaData, setMetaData] = React.useState({
    [formFieldName]: {value: data[fieldName], errorState: false, errorText: ''},
  })
  const theme = useTheme()

  const field = {
    id: formFieldName,
    type: formFieldName,
  }

  const OptionMenuItem = Object.keys(options).map((item, index) => {
    return (
      <MenuItem key={index} value={item}>
        {options[item]}
      </MenuItem>
    )
  })

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
        {label}
      </Typography>
      <Select
        id="demo-simple-select"
        label={formFieldName}
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
        {OptionMenuItem}
      </Select>
    </Box>
  )
}

export default SelectOptionsInput
