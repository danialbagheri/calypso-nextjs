import * as React from 'react'

import Head from 'next/head'

import {
  // BestSeller,
  BestSellerSlider,
  BlogSlider,
  HomeSlider,
  Instagram,
  ProductFinderBanner,
  SpotlightHomePageBanner,
  Trending,
} from 'components'
import {getCollectionBanner, getTrendingUrls} from 'services'

function Home(props) {
  const {trending, homepageBanner, productFinderBanner} = props

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
          <HomeSlider banner={homepageBanner[0].slides} />
          <Trending items={trending?.items} name={trending?.name} />
          <HomeSlider />
          <BestSellerSlider />
          <SpotlightHomePageBanner />
          <BlogSlider />
          <ProductFinderBanner banner={productFinderBanner?.[0]} />
          <Instagram />
        </section>
      </main>
    </div>
  )
}

export default Home

export async function getStaticProps() {
  const promises = [
    getTrendingUrls(),
    getCollectionBanner('homepage'),
    getCollectionBanner('product-finder'),
  ]
  const results = await Promise.allSettled(promises)
  const initialProps = {
    trending: results[0]?.status === 'fulfilled' ? results[0].value : {},
    homepageBanner:
      results[1]?.status === 'fulfilled' ? results[1].value.results : [],
    productFinderBanner:
      results[2]?.status === 'fulfilled'
        ? results[2].value.results[0]?.slides ?? []
        : [],
  }

  return {
    props: {...initialProps},
    revalidate: 120,
  }
}
