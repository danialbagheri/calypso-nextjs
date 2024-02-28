import * as React from 'react'

import Head from 'next/head'

import {
  AsSeen,
  BestSeller,
  BlogSlider,
  HomeSlider,
  Instagram,
  StaySafe,
  Trending,
} from 'components'
import {AppContext} from '../components/appProvider/AppProvider'
import {useAuthFetch} from 'components/customHooks'
import {getFavoriteProductsHandler} from 'utils'

function Home() {
  const authFetchHandler = useAuthFetch()
  const [, setAppState] = React.useContext(AppContext)

  React.useEffect(() => {
    //Get user favorite products
    getFavoriteProductsHandler({setAppState, authFetchHandler})
  }, [])

  return (
    <div>
      <Head>
        <title>Calypso Sun - Bring out the sunshine - Calypso</title>
        <meta
          content="Calypso sun are suitable for the whole family and protect all skin types from the harmful effects of both UVA and UVB rays. Try Calypso Once a Day sunscreen, aftersun products or new range of Calypso hand sanitisers."
          name="description"
        />
        <meta
          name="twitter:card"
          value="Calypso sun are suitable for the whole family and protect all skin types from the harmful effects of both UVA and UVB rays. Try Calypso Once a Day sunscreen, aftersun products or new range of Calypso hand sanitisers."
        />

        <meta
          content="Calypso Sun - Bring out the sunshine - Calypso"
          property="og:title"
        />

        <meta content="article" property="og:type" />
        <meta content="https://www.calypsosun.com/" property="og:url" />
        <meta
          content="https://calypsosun.com/social-media.png"
          property="og:image"
        />
        <meta
          content="Calypso sun are suitable for the whole family and protect all skin types from the harmful effects of both UVA and UVB rays. Try Calypso Once a Day sunscreen, aftersun products or new range of Calypso hand sanitisers."
          property="og:description"
        />
      </Head>

      <main>
        <section className="top-0">
          <HomeSlider />
          <Trending />
          <HomeSlider isSecondBanner />
          <BestSeller />
          <StaySafe />
          <AsSeen />
          <BlogSlider />
          <Instagram />
        </section>
      </main>
    </div>
  )
}

export default Home
