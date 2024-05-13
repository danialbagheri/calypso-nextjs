import * as React from 'react'

/* ----------------------------- MUI Components ----------------------------- */
import {Box, Typography, useTheme} from '@mui/material'
/* -------------------------------------------------------------------------- */

/* ---------------------------- Local Components ---------------------------- */
import {Container, FavoriteVariantsList} from 'components/user/dashboard'
import {Heart} from 'components/icons'
/* -------------------------------------------------------------------------- */

const breadcrumbs = [
  {label: 'Dashboard', href: '/user/dashboard'},
  {label: 'My Wishlist', href: ''},
]

export default function FavoriteVariants() {
  /* ---------------------------------- Hooks --------------------------------- */
  const theme = useTheme()
  /* -------------------------------------------------------------------------- */

  return (
    <Container breadcrumbs={breadcrumbs} sx={{gap: {xs: '38px', lg: '70px'}}}>
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
          <Heart sx={{fill: theme.palette.primary.main}} />
          <Typography fontSize={24} fontWeight={700}>
            My Wishlist
          </Typography>
        </Box>
        <FavoriteVariantsList />
      </Box>
    </Container>
  )
}
