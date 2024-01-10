import React from 'react'
import {AlreadyMember} from '../../../components/user/AlreadyMember'

import {assetsEndPoints, getAssets} from '../../../utils'
import {Box} from '@mui/material'

export default function SingIn(props) {
  const {assets} = props
  return (
    <Box sx={{'&>div': {m: '0 auto', py: {md: 10}}}}>
      <AlreadyMember assets={assets} />
    </Box>
  )
}

export async function getStaticProps() {
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
}
