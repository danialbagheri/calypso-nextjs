import * as React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'

function Recommendation() {
  const [selectedValue, setSelectedValue] = React.useState('yes')

  const BpIcon = styled('span')(({theme}) => ({
    borderRadius: '50%',
    width: 37,
    height: 37,
    border: `1px solid ${theme.palette.primary.light}`,
    position: 'relative',
  }))

  const BpCheckedIcon = styled(BpIcon)(({theme}) => ({
    '&:before': {
      display: 'block',
      width: 31,
      height: 31,
      backgroundColor: theme.palette.primary.main,
      content: '""',
      borderRadius: '50%',

      position: 'absolute',
      top: 2,
      left: 2,
    },
  }))

  const controlProps = item => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: {'aria-label': item},
    icon: <BpIcon />,
    checkedIcon: <BpCheckedIcon />,
  })

  const handleChange = event => {
    setSelectedValue(event.target.value)
  }
  return (
    <Stack
      justifyContent={'space-between'}
      mt={17}
      alignItems={{xs: 'flex-start', md: 'center'}}
      direction={{md: 'row'}}
    >
      <Typography variant={'body3'}>
        Would you recommend this product?
      </Typography>
      <Stack alignItems={'center'} spacing={6} direction={'row'}>
        <Box>
          <label>
            <Typography variant={'body3'}>Yes</Typography>
          </label>
          <Radio {...controlProps('yes')} />
        </Box>

        <Box>
          <label>
            <Typography variant={'body3'}>No</Typography>
          </label>
          <Radio {...controlProps('no')} />
        </Box>
      </Stack>
    </Stack>
  )
}

export default Recommendation
