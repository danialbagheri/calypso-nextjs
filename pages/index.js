import * as React from 'react'

import Head from 'next/head'

import {
  BestSeller,
  BlogSlider,
  HomeSlider,
  Instagram,
  Trending,
} from 'components'

import {
  getBestSellerResults,
  getCollectionBanner,
  getTrendingUrls,
} from 'services'
import {Skeleton} from '@mui/material'
import {destroyCookie, parseCookies, setCookie} from 'nookies'
import {getFavoriteProducts, postRefreshToken} from '../services'
import {AppContext} from '../components/appProvider/AppProvider'

export const getFavoriteProductsHandler = async setAppState => {
  const {calacc, calref} = parseCookies()

  try {
    const favoriteProducts = await getFavoriteProducts(calacc)
    setAppState(prevState => ({
      ...prevState,
      favoriteProducts: favoriteProducts.results,
      isAuthenticate: true,
    }))
  } catch (err) {
    if (err.status === 401) {
      try {
        const {access} = await postRefreshToken({refresh: calref || 'no-token'})

        setCookie(null, 'calacc', access, {
          path: '/',
        })

        const favoriteProducts = await getFavoriteProducts(access)

        setAppState(prevState => ({
          ...prevState,
          favoriteProducts: favoriteProducts.results,
          isAuthenticate: true,
        }))
      } catch (err) {
        if (err.status === 401) {
          destroyCookie(null, 'calacc', {path: '/'})
          destroyCookie(null, 'calref', {path: '/'})
          console.error('user is not logged in')
          setAppState(prevState => ({
            ...prevState,
            favoriteProducts: undefined,
            isAuthenticate: false,
          }))
        } else {
          console.error(err)
          setAppState(prevState => ({
            ...prevState,
            favoriteProducts: undefined,
            isAuthenticate: false,
          }))
        }
      }
    } else {
      console.error(err)
      setAppState(prevState => ({
        ...prevState,
        favoriteProducts: undefined,
        isAuthenticate: false,
      }))
    }
  }
}

function Home(props) {
  const {slides, isLoaded, trending, bestseller, secondarySlides} = props
  const [, setAppState] = React.useContext(AppContext)

  React.useEffect(() => {
    //Get user favorite products
    getFavoriteProductsHandler(setAppState)
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
          {slides ? (
            <HomeSlider isLoaded={isLoaded} slides={slides} />
          ) : (
            <Skeleton height={400} variant="rectangular" width={'100%'} />
          )}

          <Trending trending={trending} />
          {secondarySlides ? (
            <HomeSlider isLoaded={isLoaded} second slides={secondarySlides} />
          ) : null}
          <BestSeller bestseller={bestseller} />
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
