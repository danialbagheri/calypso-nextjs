import * as React from 'react'

/* ----------------------------- MUI Components ----------------------------- */
import {Box, useTheme} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {AlreadyMember, NewMember} from 'components/user'
import {assetsEndPoints, getAssets} from '../../utils'
import {postVerificationCookie} from '../../services'
/* -------------------------------------------------------------------------- */

export default function User(props) {
  const {assets} = props
  const theme = useTheme()

  // React.useEffect(async () => {
  //   const verifyCookie = await postVerificationCookie()

  //   console.log('🚀 🙂  verifyCookie:::', verifyCookie)
  // }, [])

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

export async function getStaticProps() {
  try {
    const verifyCookie = await postVerificationCookie()

    console.log('🚀 🙂  verifyCookie:::', verifyCookie)

    return {
      redirect: {
        destination: '/user/dashboard',
        permanent: false,
      },
      revalidate: 120, // will be passed to the page component as props
    }
  } catch (err) {
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
}
