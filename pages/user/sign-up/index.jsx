import * as React from 'react'

import {Box} from '@mui/material'

import {AccountCreated, UserDetails} from '../../../components/user/signUp'
import {assetsEndPoints, getAssets} from '../../../utils'

export default function SignUp(props) {
  const {assets} = props

  const [steps, setSteps] = React.useState(0)

  const componentsQueue = [
    <UserDetails assets={assets} key="users_details" setSteps={setSteps} />,
    <AccountCreated assets={assets} key="account_created" />,
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

export async function getStaticProps() {
  const {
    infoIcon,
    checkIcon,
    userAccountTopIcons,
    popUpPassword,
    popUpReferrals,
  } = assetsEndPoints

  const assets = await getAssets([
    infoIcon,
    checkIcon,
    userAccountTopIcons,
    popUpPassword,
    popUpReferrals,
  ])

  return {
    props: {
      assets,
    },
    revalidate: 120, // will be passed to the page component as props
  }
}
