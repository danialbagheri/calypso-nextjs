import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, useTheme} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {parseCookies} from 'nookies'
import {AppContext} from '../../components/appProvider'
import {AlreadyMember, NewMember} from 'components/user'
/* -------------------------------------------------------------------------- */

export default function User() {
  const [refCookieState, setRefCookieState] = React.useState(false)
  const [, setAppState] = React.useContext(AppContext)
  const theme = useTheme()
  const router = useRouter()

  const checkUserSignedIn = async () => {
    const {calacc} = parseCookies()

    if (calacc) {
      router.push('/user/dashboard')
      setAppState(perv => ({...perv, isAuthenticate: true}))
    } else {
      setRefCookieState(true)
    }
  }

  React.useEffect(() => {
    checkUserSignedIn()
  }, [])

  if (refCookieState) {
    return (
      <Box
        sx={{
          maxWidth: '880px',
          margin: '0 auto',
          pt: {xs: 8, md: '86px'},
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
            display: {xs: 'none', md: 'block'},
          }}
        />

        <AlreadyMember sx={{display: {xs: 'none', md: 'flex'}}} />
      </Box>
    )
  }
  return <Box height={200} />
}
