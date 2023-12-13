import {Box, useTheme} from '@mui/material'
import {NewMember} from '../../components/user'
import {AlreadyMember} from '../../components/user/AlreadyMember'

export default function Login() {
  const theme = useTheme()
  return (
    <Box
      sx={{
        maxWidth: '880px',
        margin: '0 auto',
        pt: {xs: '50px', md: '100px'},
        pb: {xs: '55px', md: '193px'},
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: {xs: 'column', md: 'row'},
        height: '100%',
      }}
    >
      <NewMember />

      <Box
        sx={{
          width: {xs: '100%', md: '8px'},
          height: {xs: '5px', md: '520px'},
          bgcolor: theme.palette.sand.main,
          borderRadius: '5px',
          mt: {xs: '36px', md: 0},
        }}
      />

      <AlreadyMember />
    </Box>
  )
}
