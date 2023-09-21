import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import {useTheme} from '@mui/material'

function SearchBox() {
  const theme = useTheme()

  return (
    <Box>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color={'primary'} />
            </InputAdornment>
          ),
        }}
        placeholder="Search Reviews"
        size="700"
        sx={{
          width: '100%',
          '&': {
            input: {
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
        }}
        type="search"
      />
      {/*TO DO::: Should be un commented after implementing filters*/}
      {/*<Stack direction="row" spacing={1} mt={3}>*/}
      {/*  {keywordsArr.map((keyW, i) => (*/}
      {/*    <Button*/}
      {/*      key={`${keyW}${i}`}*/}
      {/*      sx={{borderRadius: 7}}*/}
      {/*      variant={i === 2 ? 'contained' : 'outlined'}*/}
      {/*      fontSize={16}*/}
      {/*    >*/}
      {/*      {keyW}*/}
      {/*    </Button>*/}
      {/*  ))}*/}
      {/*</Stack>*/}
    </Box>
  )
}

export default SearchBox
