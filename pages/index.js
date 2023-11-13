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

import {
  getBestSellerResults,
  getCollectionBanner,
  getTrendingUrls,
} from 'services'

function Home({slides, isLoaded, trending, bestseller, secondarySlides}) {
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
          <HomeSlider isLoaded={isLoaded} slides={slides} />

          <Trending trending={trending} />
          {secondarySlides ? (
            <HomeSlider isLoaded={isLoaded} second slides={secondarySlides} />
          ) : null}
          <BestSeller bestseller={bestseller} />
          <StaySafe />
          <AsSeen />
          <BlogSlider />
          <Instagram />
        </section>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const props = {
    slides: [],
    secondarySlides: [],
    isLoaded: false,
    trending: [],
    bestseller: {},
  }
  const promises = [
    getCollectionBanner('homepage'),
    getCollectionBanner('secondary'),
    getTrendingUrls(),
    getBestSellerResults(),
  ]
  const results = await Promise.allSettled(promises)

  results.forEach((res, i) => {
    if (res.status === 'fulfilled') {
      switch (i) {
        case 0:
          props.slides = res.value.results
          break
        case 1:
          props.secondarySlides = res.value.results
          break
        case 2:
          props.trending = res.value.items
          break
        case 3:
          props.bestseller = res.value
          break
      }
    }
  })

  return {
    props: {...props, isLoaded: true},
    revalidate: 120, // will be passed to the page component as props
  }
}

export default Home
