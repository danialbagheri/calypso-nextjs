import * as React from 'react'
import {Box} from '@mui/material'

import {getIcons} from '../../services'
import {AccountCreated, UserDetails} from '../../components/user/signUp'

export default function SignUp(props) {
  const {data} = props

  const [steps, setSteps] = React.useState(1)

  const componentsQueue = [
    <UserDetails data={data} key="users_details" setSteps={setSteps} />,
    <AccountCreated data={data} key="users_details" />,
  ]

  return (
    <Box
      className="centralize"
      sx={{
        maxWidth: 880,
        margin: '0 auto',
        py: {xs: '50px', md: '120px'},
        flexDirection: 'column',
      }}
    >
      {componentsQueue[steps]}
    </Box>
  )
}

export async function getStaticProps() {
  const promises = [getIcons('check-icon')]
  const results = await Promise.allSettled(promises)
  return {
    props: {data: {icons: results ? results[0].value : null}},
    revalidate: 120, // will be passed to the page component as props
  }
}
