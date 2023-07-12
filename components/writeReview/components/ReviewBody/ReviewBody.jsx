import * as React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import {useTheme} from '@mui/material'
import Stack from '@mui/material/Stack'

function ReviewBody(props) {
  const TITLE = 'title'
  const COMMENT = 'comment'
  const [fieldData, setFieldData] = React.useState({
    [TITLE]: '',
    [COMMENT]: '',
  })
  const theme = useTheme()

  const fields = [
    {
      id: TITLE,
      type: TITLE,
      label: 'Add a headline',
      placeholder: 'What’s most important to know?',
    },
    {
      id: COMMENT,
      type: COMMENT,
      label: 'Add a written review',
      placeholder:
        'What did you like or dislike? What did you use this product for?',
      lines: 10,
    },
  ]

  const onChange = (e, type) => {
    e.preventDefault()
    props.changeHandler(type, e.target.value)
    setFieldData(prev => ({
      ...prev,
      [type]: e.target.value,
    }))
  }

  return (
    <Stack mt={15} spacing={5}>
      {fields.map(field => (
        <Box key={field.id}>
          <Typography mb={2} variant={'h6'}>
            {field.label}
          </Typography>
          <TextField
            error={props.error[field.type]?.state}
            helperText={props.error[field.type]?.message}
            minRows={field.lines}
            multiline={Boolean(field.lines)}
            onChange={e => onChange(e, field.type)}
            placeholder={field.placeholder}
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
            value={fieldData[field.type]}
          />
        </Box>
      ))}
    </Stack>
  )
}

export default ReviewBody
