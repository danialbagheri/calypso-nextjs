import { useState } from "react";
import ProductRange from "../../components/products/product-range/product-range";
import "react-tabs/style/react-tabs.css";
import Head from "next/head";
import Image from "next/image";
import FilterProducts from "../../components/products/filter-products";
import _ from "lodash";

function Products(props) {
  const ordered_products = _.orderBy(
    // checks if product is in multiple collections meaning it's more popular than others
    props.products,
    [(item) => item.types[0].id, (item) => item.collection_names.length],
    ["asc", "desc"]
  );

  const [products, setProducts] = useState(ordered_products);
  const [limit, setLimit] = useState(10);

  const [maxLimit, setMaxLimit] = useState(false);

  function LoadMore() {
    const newLimit = limit + 10;
    if (newLimit >= products.length) {
      setLimit(products.length);
      setMaxLimit(true);
    } else {
      setLimit(newLimit);
    }
  }

  return (
    <div>
      <Head>
        <title>
          Calypso Products range - Sun Protection, After Sun, Kids products,
          Tanning and Health care
        </title>
        <meta
          name="description"
          content="From scalp protection to insect repellent, we have everything you need to stay protected in the sun both at home and abroad. Our products are available to buy from some of the biggest UK grocery chains as well as some independent pharmacies, and online on Amazon."
        />
      </Head>
      <section className="container-fluid top20">
        <div className="row">
          <div className="col-lg-7 col-md-9 col-xs-12">
            <div className="product-page-banner-image">
              <Image
                alt="Calypso Product Clear Protection"
                src="/product-page/banner-spain.jpg"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-3 col-xs-12 m2">
            <h2 className="text-right CalypsoOrangeText mt-4">Products</h2>
            <p className="text-right">
              Discover Calypso Sun and Skin care products.
            </p>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="product-page-filter row">
          <FilterProducts
            limit={limit}
            products={ordered_products}
            setProducts={setProducts}
            setLimit={setLimit}
            setMaxLimit={setMaxLimit}
          />
        </div>
        <div>
          <ProductRange
            type="sun%20protection"
            products={products}
            limit={limit}
          />
          {maxLimit ? (
            <span id="loading"></span>
          ) : (
            <div className="text-centre m-3">
              <button
                onClick={LoadMore}
                className="btn btn-calypso"
                id="loading"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
async function getAllPages(pageCount, url) {
  let pageNumber = 1;
  let productResult = [];
  for (pageNumber; pageNumber <= pageCount; pageNumber++) {
    let paginatedUrl = url + `?page=${pageNumber}`;
    const res = await fetch(paginatedUrl);
    const product = await res.json();
    productResult.push(product.results);
  }
  return productResult;
}
export async function getStaticProps(context) {
  const baseUrl = process.env.API_URL;
  const endpoint = `products/product/`;
  const finalUrl = baseUrl + endpoint;
  const res = await fetch(finalUrl);
  let products = await res.json();
  const pageCount = Math.ceil(products.count / 10);
  let productResult = await getAllPages(pageCount, finalUrl);
  // Now we will get the staff picked articles

  if (!productResult) {
    return {
      notFound: true,
      isLoaded: false,
    };
  }

  return {
    props: { products: productResult.flat(), isLoaded: true },
    revalidate: 120, // will be passed to the page component as props
  };
}

export default Products;
