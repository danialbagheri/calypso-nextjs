import Head from "next/head";
import HomeSlider from "../components/home/home-slider";
import Trending from "../components/home/trending";
import StaySafe from "../components/home/stay-safe";
import AsSeen from "../components/home/as-seen";
import BlogSlider from "../components/blogs/blog-slider";
import Instagram from "../components/common/instagram";

function Home({ slides, isLoaded }) {
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
            <Trending />
          </div>
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
  const endpoint = `web/slider/?slug=homepage`;
  const finalUrl = baseUrl + endpoint;
  const res = await fetch(finalUrl);
  const slides = await res.json();
  // Now we will get the staff picked articles

  if (!slides) {
    return {
      notFound: true,
      isLoaded: false,
    };
  }

  return {
    props: { slides: slides.results, isLoaded: true }, // will be passed to the page component as props
  };
}

export default Home;
