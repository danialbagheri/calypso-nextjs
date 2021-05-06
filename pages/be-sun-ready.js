import Head from "next/head";
import ShareButton from "../components/common/shareButton";
import SunBanner from "../components/be-sun-ready/sun-banner";
import IntroText from "../components/be-sun-ready/intro-text";
import SunFactor from "../components/be-sun-ready/sunFactor";
import FourSkinTypes from "../components/be-sun-ready/four-skin-types";
import ApplyBefore from "../components/be-sun-ready/apply-before";
import CoverUp from "../components/be-sun-ready/cover-up";
import Shade from "../components/be-sun-ready/shade";

export default function BeSunReady({ productData }) {
  return (
    <div>
      <Head>
        <title>Be Sun Read by Calypso Sun</title>
        <meta
          name="description"
          content="LEARNING HOW TO PROTECT YOURSELF FROM THE SUN"
        />
      </Head>
      <SunBanner />
      <IntroText />
      <SunFactor />
      <FourSkinTypes />
      <div className="centre" style={{ width: "50px" }}>
        <ShareButton text="Be Sun Ready by Calypso" media="" />
      </div>
      <ApplyBefore products={productData} />
      <CoverUp />
      <Shade />
    </div>
  );
}

export async function getStaticProps(context) {
  const baseUrl = process.env.API_URL;
  const url = baseUrl + `products/product/?type=sun%20protection&count=3`;
  const res = await fetch(url);
  const productData = await res.json();

  return {
    props: {
      productData: productData.results,
    },
    revalidate: 1,
  };
}
