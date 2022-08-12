import React from "react";
import BreadCrumb from "../../components/common/breadcrumb";
import ProductRangeItem from "../../components/products/product-range/ProductRangeItem";
import HomeSlider from "../../components/home/home-slider";

export default function BackToSchool(props) {
  const { collection, slides, isLoaded, notFound } = props;
  const breadCrumbPath = [
    { name: "Home", url: "/" },
    { name: "Collections", url: "/collections/" },
    { name: "Back to School", url: "/back-to-school/" },
  ];
  const collectionItems = collection.items.map((item, index) => {
    return <ProductRangeItem product={item.item} key={index} />;
  });

  return (
    <div>
      <HomeSlider slides={slides} isLoaded={isLoaded} />
      <div className="container">
        <div style={{ padding: 10 }}>
          <BreadCrumb breadcrumbs={breadCrumbPath} />
          {collectionItems}
        </div>
      </div>
    </div>
  );
}

const getBannerSlides = async (slug) => {
  const baseUrl = process.env.API_URL;
  const endpoint = `web/slider/?slug=${slug}`;
  const finalUrl = baseUrl + endpoint;
  const res = await fetch(finalUrl);
  const slides = await res.json();
  return slides;
};

export async function getStaticProps(context) {
  const baseUrl = process.env.API_URL;
  const collectionEndPoint = baseUrl + `products/collections/back-to-school/`;
  const collectionResult = await fetch(collectionEndPoint);
  const collection = await collectionResult.json();
  const slides = await getBannerSlides("back-to-school");
  // Now we will get the staff picked articles

  if (!slides || !collectionResult) {
    return {
      notFound: true,
      isLoaded: false,
    };
  }

  return {
    props: {
      collection: collection,
      isLoaded: true,
      notFound: false,
      slides: slides.results,
    }, // will be passed to the page component as props
  };
}
