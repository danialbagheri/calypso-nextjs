import * as React from 'react'

/* ----------------------------- MUI Components ----------------------------- */
import {Box, Typography, useTheme} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {AppContext} from 'components'
import {assetsEndPoints, getAssets, WISH_LIST_FILL_ICON_ID} from 'utils'
import {ACCOUNT_DETAILS} from '../account-details'
import {Container, FavoriteProductsList} from 'components/user/dashboard'
/* -------------------------------------------------------------------------- */

export default function FavoriteProducts(props) {
  const {assets} = props
  /* ---------------------------------- Hooks --------------------------------- */
  const [appState] = React.useContext(AppContext)
  const theme = useTheme()

  /* -------------------------------------------------------------------------- */
  const {userAccount} = assetsEndPoints
  const heartIcon = appState.icons?.[userAccount]?.items?.find(
    icon => icon.id === WISH_LIST_FILL_ICON_ID,
  )

  return (
    <Container assets={assets} iconName={ACCOUNT_DETAILS}>
      <Box
        className="centralize"
        sx={{
          width: '100%',

          flexDirection: 'column',
          gap: {xs: '33px', md: '53px'},
        }}
      >
        <Box
          sx={{
            mt: 7,

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 3,
          }}
        >
          <Box
            dangerouslySetInnerHTML={{
              __html: heartIcon?.svg_icon_text,
            }}
            sx={{
              '& svg': {
                fill: theme.palette.primary.main,
                width: 26,
                height: 24,
              },
            }}
          ></Box>
          <Typography fontSize={24} fontWeight={700}>
            My Wishlist
          </Typography>
        </Box>
        <FavoriteProductsList />
      </Box>
    </Container>
  )
}

export async function getStaticProps() {
  try {
    const {userAccountTopIcons} = assetsEndPoints

    const assets = await getAssets([userAccountTopIcons])

    return {
      props: {
        assets,
      },
      revalidate: 120,
    }
  } catch (err) {
    console.error(err)
    return {
      props: {
        assets: {},
      },
      revalidate: 120,
    }
  }
}
