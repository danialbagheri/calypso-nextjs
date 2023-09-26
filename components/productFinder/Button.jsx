import {Button as MuiButton} from '@mui/material'

export function Button(props) {
  const {sx = {}} = props
  return (
    <MuiButton
      {...props}
      sx={{
        py: 3,
        width: '100%',
        borderRadius: '78px',
        boxShadow: 'none',
        bgcolor: props.bgcolor,
        color: props.fontColor,
        textTransform: 'none',
        transition: '300ms',
        '&:hover': {
          fontWeight: 700,
          boxShadow: 'none',
          bgcolor: props.bgcolor,
          borderColor: sx.borderColor ?? 'unset',
        },
        ...sx,
      }}
    >
      {props.children}
    </MuiButton>
  )
}
