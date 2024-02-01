import * as React from 'react'

/* ---------------------------- NextJs Components --------------------------- */
import {useRouter} from 'next/router'
/* -------------------------------------------------------------------------- */

/* ----------------------------- MUI Components ----------------------------- */
import {Box, useTheme} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {AlreadyMember, NewMember} from 'components/user'
import {assetsEndPoints, getAssets} from '../../utils'
import {parseCookies} from 'nookies'
import {AppContext} from '../../components/appProvider'
/* -------------------------------------------------------------------------- */

export default function User(props) {
  const {assets} = props
  const [refCookieState, setRefCookieState] = React.useState(false)
  const [, setAppState] = React.useContext(AppContext)
  const theme = useTheme()
  const router = useRouter()

  const checkUserSignedIn = async () => {
    const {calref} = parseCookies()

    console.log('in user page')
    if (calref) {
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
        <NewMember assets={assets} />

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

export async function getStaticProps() {
  try {
    const {checkIcon, creatingAccountBenefits, userAccountTopIcons} =
      assetsEndPoints

    const assets = await getAssets([
      checkIcon,
      creatingAccountBenefits,
      userAccountTopIcons,
    ])

    return {
      props: {
        assets,
      },
      revalidate: 120, // will be passed to the page component as props
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        assets: {},
      },
      revalidate: 120, // will be passed to the page component as props
    }
  }
}
