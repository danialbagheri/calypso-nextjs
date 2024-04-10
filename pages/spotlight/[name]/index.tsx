import type {GetStaticPropsContext} from 'next'

import {Box} from '@mui/material'

import {spotlight} from 'constants/spotlight'
import {Header} from 'components/spotlight'

interface PropsType {
  name: string
}

export default function Spotlight(props: PropsType) {
  const {name} = props

  const spotlightData = spotlight[name]
  const headerData = spotlightData.header

  return (
    <Box pb="112px">
      <Header data={headerData} />
      <Box
        sx={{
          maxWidth: '1200px',
          px: '31px',
        }}
      ></Box>
    </Box>
  )
}

export const getStaticPaths = async () => {
  const names = Object.keys(spotlight)
  if (names?.length) {
    return {
      paths: names.map(name => ({params: {name}})),
      fallback: 'blocking',
    }
  }

  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const name = context.params?.name

  return {
    props: {
      name,
    },
    revalidate: 120, // will be passed to the page component as props
  }
}
