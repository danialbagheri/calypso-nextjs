import Head from "next/head";

import {AsSeen, BestSeller, BlogSlider, HomeSlider, Instagram, StaySafe, Trending} from 'components'

import { getCollectionBanner} from 'services'

function Home({ slides, isLoaded, trending, bestseller, secondarySlides }) {
  return (
    <div>
      <Head>
        <title>Calypso Sun - Bring out the sunshine - Calypso</title>
        <meta
          name="description"
          content="Calypso sun are suitable for the whole family and protect all skin types from the harmful effects of both UVA and UVB rays. Try Calypso Once a Day sunscreen, aftersun products or new range of Calypso hand sanitisers."
        />
        <meta
          name="twitter:card"
          value="Calypso sun are suitable for the whole family and protect all skin types from the harmful effects of both UVA and UVB rays. Try Calypso Once a Day sunscreen, aftersun products or new range of Calypso hand sanitisers."
        />

        <meta
          property="og:title"
          content="Calypso Sun - Bring out the sunshine - Calypso"
        />

        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.calypsosun.com/" />
        <meta
          property="og:image"
          content="https://calypsosun.com/social-media.png"
        />
        <meta
          property="og:description"
          content="Calypso sun are suitable for the whole family and protect all skin types from the harmful effects of both UVA and UVB rays. Try Calypso Once a Day sunscreen, aftersun products or new range of Calypso hand sanitisers."
        />
      </Head>

      <main>
        <section className="top-0">
          <HomeSlider slides={slides} isLoaded={isLoaded} />
          <div className="container-fluid">
            <Trending trending={trending} />
          </div>
          <div className="mt-5"> </div>
          <HomeSlider slides={secondarySlides} isLoaded={isLoaded} />
          <div className="mt-5"> </div>
          <BestSeller bestseller={bestseller} />
          <StaySafe />
          <AsSeen />
          <BlogSlider />
          <Instagram />
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const baseUrl = process.env.API_URL;

  const slides = await getCollectionBanner('homepage')
  const secondarySlides = await getCollectionBanner("secondary");
  // Now we will get the staff picked articles
  // api call for trending products

  const trendingUrl = baseUrl + `products/collections/trending/?resize_w=580`;
  const trendingResults = await fetch(trendingUrl);
  const trending = await trendingResults.json();
  // Best product collections
  const bestSellerEndPoint = baseUrl + `products/collections/best_seller/`;
  const bestSellerResults = await fetch(bestSellerEndPoint);
  const bestSeller = await bestSellerResults.json();
  if (!slides || !secondarySlides) {
    return {
      notFound: true,
      isLoaded: false,
    };
  }

  return {
    props: {
      slides: slides.results,
      secondarySlides: secondarySlides.results,
      isLoaded: true,
      trending: trending.items,
      bestseller: bestSeller,
    },
    revalidate: 120, // will be passed to the page component as props
  };
}

export default Home;
