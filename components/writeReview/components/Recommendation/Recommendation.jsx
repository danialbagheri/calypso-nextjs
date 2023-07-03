import * as React from 'react'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio'
import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'

function Recommendation(props) {
  const [selectedValue, setSelectedValue] = React.useState('yes')

  console.log('PRPOS::::', props)

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
      width: 28,
      height: 28,
      backgroundColor: theme.palette.primary.main,
      content: '""',
      borderRadius: '50%',

      position: 'absolute',
      top: 4,
      left: 4,
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
    props.data.answers[0].answer = event.target.value

    setSelectedValue(event.target.value)
  }
  return (
    <Stack
      alignItems={{xs: 'flex-start', md: 'center'}}
      direction={{md: 'row'}}
      justifyContent={'space-between'}
      mt={17}
    >
      <Typography variant={'body3'}>
        Would you recommend this product?
      </Typography>
      <Stack alignItems={'center'} direction={'row'} spacing={6}>
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
