import * as React from 'react'

import Head from 'next/head'

import {
  BestSeller,
  BlogSlider,
  HomeSlider,
  Instagram,
  Trending,
} from 'components'

import {AppContext} from '../components/appProvider/AppProvider'
import {useAuthFetch} from 'components/customHooks'
import {getFavoriteProductsHandler} from 'utils'
import {getCollectionBanner, getTrendingUrls} from 'services'

function Home(props) {
  const {trendingItems, homepageBanner} = props

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
          <HomeSlider banner={homepageBanner} />
          <Trending items={trendingItems} />
          <HomeSlider />
          <BestSeller />
          <BlogSlider />
          <Instagram />
        </section>
      </main>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const promises = [getTrendingUrls(), getCollectionBanner('homepage')]
  const results = await Promise.allSettled(promises)
  const initialProps = {
    trendingItems:
      results[0]?.status === 'fulfilled' ? results[0].value.items : [],
    homepageBanner:
      results[1]?.status === 'fulfilled' ? results[1].value.results : [],
  }

  return {
    props: {...initialProps},
    revalidate: 120,
  }
}
