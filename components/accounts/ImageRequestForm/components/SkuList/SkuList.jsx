import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import {useTheme} from '@mui/material'

function SkuList(props) {
  const BODY = 'sku_list'
  const [fieldRawData, setFildRawData] = React.useState({
    [BODY]: '',
  })
  const [fieldData, setFieldData] = React.useState({
    [BODY]: '',
  })
  const theme = useTheme()

  const field = {
    id: BODY,
    type: BODY,
    label: 'Enter products SKU list',
    placeholder: 'CALC10L\nCALC40',
    lines: 10,
  }

  const onChange = (e, type) => {
    e.preventDefault()

    let content = e.target.value
    let result = content.split('\n').filter(n => n)
    props.changeHandler(type, result)
    setFieldData(prev => ({
      ...prev,
      [type]: result,
    }))
    setFildRawData(prev => ({
      ...prev,
      [type]: content,
    }))
  }

  return (
    <Box key={field.id} sx={{mt: 2}}>
      <Typography variant={'h6'} mb={2}>
        {field.label}
      </Typography>
      <TextField
        sx={{
          '&': {
            '.MuiInputBase-root': {borderRadius: 5},
            input: {
              color: theme.palette.primary.main,
              ...theme.typography.body4,
              padding: '10px 15px',
            },
            textArea: {
              color: theme.palette.primary.main,
              ...theme.typography.body4,
            },
            width: '100%',
          },
        }}
        value={fieldRawData[field.type]}
        onChange={e => onChange(e, field.type)}
        placeholder={field.placeholder}
        multiline={Boolean(field.lines)}
        minRows={field.lines}
      />
    </Box>
  )
}

export default SkuList
