import * as React from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import {useTheme} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

function Filters(props) {
  const filters = [
    {title: 'All Variants'},
    {title: 'Rating'},
    {title: 'Image/Video'},
  ]

  const FiltersSelectBox = ({title = ''}) => {
    const [filter, setFilter] = React.useState('')
    const theme = useTheme()

    const handleChange = event => {
      setFilter(event.target.value)
    }

    return (
      <FormControl
        color={'secondary'}
        sx={{
          m: 1,
          minWidth: 120,
          '& .MuiInputBase-root': {
            color: theme.palette.secondary.main,
            paddingRight: 2,
          },
          '& fieldset': {borderColor: theme.palette.secondary.light},
          '& .MuiInputBase-root:hover': {
            '& fieldset': {borderColor: theme.palette.secondary.main},
          },
        }}
        size="small"
      >
        <Select
          value={filter}
          onChange={handleChange}
          displayEmpty
          IconComponent={() => <KeyboardArrowDownIcon color={'secondary'} />}
        >
          <MenuItem value="">
            <em>{title}</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    )
  }

  return (
    <Box>
      {filters.map(filter => (
        <FiltersSelectBox title={filter.title} />
      ))}
    </Box>
  )
}

export default Filters
