import type {GetStaticPropsContext} from 'next'

import {Box} from '@mui/material'

import {spotlight} from 'constants/spotlight'
import {Header, NewestSpotlight, SpotlightBody} from 'components/spotlight'

interface PropsType {
  name: string
}

export default function Spotlight(props: PropsType) {
  const {name} = props

  const spotlightData = spotlight[name]

  if (!spotlightData) {
    return (
      <Box p={20} textAlign="center">
        <h1>Spotlight not found</h1>
      </Box>
    )
  }
  const headerData = spotlightData.header
  const personData = spotlightData.specifications
  const bodyData = spotlightData.items

  return (
    <Box>
      <Header data={headerData} />
      <Box
        sx={{
          maxWidth: '824px',
          px: {xs: 0, md: '30px'},
          m: '0 auto',
        }}
      >
        <SpotlightBody data={bodyData} personData={personData} />
        <NewestSpotlight currentSpotlight={name} />
      </Box>
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

  if (!name) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      name,
    },
    revalidate: 120, // will be passed to the page component as props
  }
}
