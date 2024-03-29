import Head from 'next/head'
import ShareButton from '../components/common/shareButton/ShareButton'
import ImageBanner from '../components/be-sun-ready/image-banner'
import IntroText from '../components/be-sun-ready/intro-text'
import SunFactor from '../components/be-sun-ready/sunFactor'
import FourSkinTypes from '../components/be-sun-ready/four-skin-types'
import ApplyBefore from '../components/be-sun-ready/apply-before'
import CoverUp from '../components/be-sun-ready/cover-up'
import Shade from '../components/be-sun-ready/shade'
import RecommendedProducts from '../components/be-sun-ready/recomended-product'

export default function BeSunReady({productData, blogs}) {
  return (
    <div>
      <Head>
        <title>Be Sun Ready by Calypso Sun</title>
        <meta
          content="LEARNING HOW TO PROTECT YOURSELF FROM THE SUN"
          name="description"
        />
      </Head>
      <ImageBanner />
      <IntroText />
      <SunFactor />
      <FourSkinTypes />
      <ApplyBefore blogs={blogs} />
      <div className="centre" style={{width: '50px'}}>
        <ShareButton media="" text="Be Sun Ready by Calypso" />
      </div>
      <CoverUp />
      <Shade />
      <RecommendedProducts products={productData} />
    </div>
  )
}

export async function getStaticProps() {
  const baseUrl = process.env.API_URL
  const url = baseUrl + 'products/product/?type=sun%20protection&count=3'
  const res = await fetch(url)
  const productData = await res.json()

  const blogEndPoint = baseUrl + 'blogs/collections/be-sun-ready/?resize_w=450'
  const result = await fetch(blogEndPoint)
  const blogs = await result.json()
  return {
    props: {
      productData: productData.results,
      blogs: blogs.items,
    },
    revalidate: 1,
  }
}
