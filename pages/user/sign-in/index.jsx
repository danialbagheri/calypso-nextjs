import React from 'react'

import {Box} from '@mui/material'

import {AlreadyMember} from 'components/user'

export default function SingIn() {
  return (
    <Box sx={{'&>div': {m: '0 auto', py: {md: 10}}}}>
      <AlreadyMember />
    </Box>
  )
}
