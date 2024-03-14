import * as React from 'react'

import {Box} from '@mui/material'

import {AccountCreated, UserDetails} from '../../../components/user/signUp'

export default function SignUp() {
  const [steps, setSteps] = React.useState(0)

  const componentsQueue = [
    <UserDetails key="users_details" setSteps={setSteps} />,
    <AccountCreated key="account_created" />,
  ]

  return (
    <Box
      className="centralize"
      sx={{
        maxWidth: 880,
        margin: '0 auto',
        py: '50px',
        flexDirection: 'column',
      }}
    >
      {componentsQueue[steps]}
    </Box>
  )
}
