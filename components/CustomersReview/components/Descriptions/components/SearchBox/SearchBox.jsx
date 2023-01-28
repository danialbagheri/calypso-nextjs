import * as React from 'react'

import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import {useTheme} from '@mui/material'

function SearchBox(props) {
  const theme = useTheme()
  const keywordsArr = ['keyword1', 'keyword2', 'keyword3', 'keyword4']

  return (
    <Box>
      <TextField
        sx={
          {
            width: '100%',
            '&': {
              'input': {
                color: theme.palette.primary.main,
                padding: '20px 15px',
              },
              '>div': {
                borderRadius: 5,
                fontSize: 16,
              },
              '.MuiOutlinedInput-root:hover': {
                '& > fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.light,
              },
            },
          }
        }
        placeholder='Search Reviews'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon color={'primary'} />
            </InputAdornment>
          ),
        }}
        size='700'
        type='search'
      />

      <Stack direction='row' spacing={1} mt={3}>
        {keywordsArr.map((keyW, i) => <Button sx={{borderRadius: 7}} variant={i === 2 ? 'contained' : 'outlined'}
                                              fontSize={16}>{keyW}</Button>)}
      </Stack>
    </Box>
  )
}

export default SearchBox