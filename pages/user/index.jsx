import * as React from 'react'
import {Box, useTheme} from '@mui/material'
import {NewMember} from 'components/user'
import {AlreadyMember} from 'components/user/AlreadyMember'
import {getIcons} from 'services'

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

export async function getStaticProps() {
  const promises = [getIcons('user-account-top-icons')]
  const results = await Promise.allSettled(promises)

  return {
    props: {data: {icons: results ? results[0].value : null}},
    revalidate: 120, // will be passed to the page component as props
  }
}
