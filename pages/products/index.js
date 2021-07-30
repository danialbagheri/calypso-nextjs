import { useState, useEffect } from "react";
import ProductRange from "../../components/products/product-range";
import "react-tabs/style/react-tabs.css";
import Head from "next/head";
import Image from "next/image";
function Products(props) {
  const [products, setProducts] = useState(props.products);
  const [limit, setLimit] = useState(10);
  const [maxLimit, setMaxLimit] = useState(false);

  function sortLimit(filteredProducts) {
    if (limit <= filteredProducts.length) {
      if (filteredProducts.length > 10) {
        setLimit(10);
        setMaxLimit(false);
      } else {
        setLimit(filteredProducts.length);
        setMaxLimit(true);
      }
    } else {
      setLimit(filteredProducts.length);
      setMaxLimit(true);
    }
  }

  function filterProductsByCategory(productType) {
    const filteredProducts = props.products.filter((product) => {
      return product.types[0].name.includes(productType);
    });
    setProducts(filteredProducts);
    sortLimit(filteredProducts);
  }
  function filterByProperties(value) {
    const filteredProducts = props.products.filter((product) => {
      let productsVariants = product.variants.filter((variant) => {
        return variant.name.includes(value);
      });
      return productsVariants.length >= 1;
    });

    setProducts(filteredProducts);
    sortLimit(filteredProducts);
  }

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
            <h2 className="text-right CalypsoOrangeText">Products</h2>
            <p className="text-right">
              Discover Calypso Sun and Skin care products.
            </p>
          </div>
        </div>
      </section>
      <section className="container">
        <div className="top50" />

        <div className="product-page-filter row">
          <div className="col-md-3 col-12 col-xs-12 mt-1 mb-1 product-page-filter-item">
            <span className="ml-2">
              Showing {limit} of {products.length} results.
            </span>
          </div>
          <div className="col-md-4 col-12 col-xs-12 mt-1 mb-1 product-page-filter-item">
            <label>Categories</label>
            <select
              className="form-select"
              onChange={(e) => filterProductsByCategory(e.target.value)}
            >
              <option value="">All</option>
              <option value="Sun protection">Sun Protection</option>
              <option value="After Sun">After Sun</option>
              <option value="Kids">Kids</option>
              <option value="Tanning">Tanning</option>
              <option value="Health Care">Health Care</option>
            </select>
          </div>
          <div className="col-md-3 col-12 col-xs-12 mt-1 mb-1 product-page-filter-item">
            <label className="ml-2">Filter By</label>
            <select
              className="form-select"
              aria-label="Filter by"
              onChange={(e) => filterByProperties(e.target.value)}
            >
              <optgroup label="SPF">
                <option value="SPF 10">10</option>
                <option value="SPF 15">15</option>
                <option value="SPF 30">30</option>
                <option value="SPF 40">40</option>
                <option value="SPF 50">50+</option>
              </optgroup>
              {/* <optgroup label="Sizes">
                  <option value="Size 100">100ml</option>
                  <option value="Size 150">150ml</option>
                  <option value="Once A Day">Once A Day</option>
                  <option value="40">Silicon Free</option>
                  <option value="50">Monoi Tahiti</option>
                </optgroup> */}
            </select>
          </div>
          <div className="col-md-2 col-12 col-xs-12 mt-1 mb-1 product-page-filter-item">
            <label className="ml-2">Show</label>
            <select
              className="form-select"
              aria-label="Select Product Shown per page"
              onChange={(e) => setLimit(parseInt(e.target.value))}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
        <div style={{ padding: 10 }}>
          <ProductRange
            type="sun%20protection"
            products={products}
            limit={limit}
          />
          {maxLimit ? null : (
            <button onClick={LoadMore} className="btn btn-calypso">
              Load More
            </button>
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
    props: { products: productResult.flat(), isLoaded: true }, // will be passed to the page component as props
  };
}
export default Products;
